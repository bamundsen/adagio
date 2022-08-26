package io.adagio.adagioapi.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import io.adagio.adagioapi.dto.RegisterTaskForm;
import io.adagio.adagioapi.dto.ColorThatIsToBeShowedBasedOnPriorityDto;
import io.adagio.adagioapi.dto.StartAndEndDateDto;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.dto.TitleOrAndIdProjectQueryDTO;
import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.ColorOfPriority;
import io.adagio.adagioapi.models.DefaultMessages;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.NotificationRepository;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;
import io.adagio.adagioapi.services.TaskService;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/tasks")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private NotificationRepository notificationRepository;

	@Value("${adagio.api.base_servico_de_rotas_privadas}")
	private String base_da_url_do_servico;

	private TaskService taskService = new TaskService();

	@GetMapping
	public Page<TaskDto> list(
			@PageableDefault(sort = "dateTimeEnd", page = 0, size = 10, direction = Direction.ASC) Pageable pagination) {

		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Page<Task> tasks = taskRepository.findByUser(logged, pagination);
		return Task.convert(tasks);
	}

	@PostMapping("/list-by-start-datetime-filter")
	public ResponseEntity<List<TaskDto>> listByStartDateAndEndDate(
			@RequestBody @Valid StartAndEndDateDto startDateDto) {
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		List<Task> tasks = taskRepository
				.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeEndLessThanEqual(logged,
						startDateDto.getDateTimeStart(), startDateDto.getDateTimeEnd());

		List<TaskDto> tasksDto = Task.convertListToListTaskDto(tasks);

		return ResponseEntity.ok().body(tasksDto);
	}

	@PostMapping("/get-color-that-is-to-be-showed")
	public ResponseEntity<ColorThatIsToBeShowedBasedOnPriorityDto> getColor(
			@RequestBody @Valid StartAndEndDateDto form) {
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		List<Task> tasks = taskRepository
				.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeEndLessThanEqual(logged,
						form.getDateTimeStart(), form.getDateTimeEnd());

		ColorOfPriority hexadecimalOfColor = ColorThatIsToBeShowedBasedOnPriorityDto.defineColorThatIsToBeShowed(tasks);

		ColorThatIsToBeShowedBasedOnPriorityDto color = new ColorThatIsToBeShowedBasedOnPriorityDto(hexadecimalOfColor);
		return ResponseEntity.ok().body(color);
	}

	@PostMapping
	@Transactional
	public ResponseEntity<TaskDto> save(@RequestBody @Valid RegisterTaskForm taskForm,
			UriComponentsBuilder uriBuilder) {

		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Task task = taskForm.converter(logged, projectRepository);
		TaskDto taskDtoValidator;

		taskDtoValidator = taskService.taskValidator(task, logged, taskRepository);
		if (taskDtoValidator.isHasIssues())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.header("TimeConflict", DefaultMessages.TASK_BAD_REQUEST.getMessage()).body(taskDtoValidator);

		taskRepository.save(task);

		if (task.getProject() != null) {
			Optional<Project> project = projectRepository.findByIdAndUser(task.getProject().getId(), logged);
			project.get().setProgressStatus(taskService
					.setProjectFinishedStatusByTasks(taskRepository.findByProjectAndUser(project.get(), logged)));
			projectRepository.save(project.get());
		}

		if (taskForm.getNotifications() != null && taskForm.getNotifications().size() > 0) {
			task.setNotifications(taskService.notificationPattern(task.getNotifications()));
			for (Notification n : task.getNotifications()) {
				Notification notification = new Notification(n, task);
				notificationRepository.save(notification);
			}
		}

		URI uri = uriBuilder.path(base_da_url_do_servico + "/task/{id}").buildAndExpand(task.getId()).toUri();

		return ResponseEntity.created(uri).body(new TaskDto(task));
	}

	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<TaskDto> delete(@PathVariable("id") Long id) {

		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Optional<Task> task = taskRepository.findByIdAndUser(id, logged);

		if (task.isPresent()) {

			taskRepository.deleteByIdAndUser(id, logged);
			if (task.get().getProject() != null) {
				Optional<Project> project = projectRepository.findByIdAndUser(task.get().getProject().getId(), logged);
				project.get().setProgressStatus(taskService
						.setProjectFinishedStatusByTasks(taskRepository.findByProjectAndUser(project.get(), logged)));
				projectRepository.save(project.get());
			}
			return ResponseEntity.ok().build();
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("/list-by-title-filter")
	public ResponseEntity<Page<TaskDto>> listByTitle(
			@PageableDefault(sort = "title", page = 0, size = 10, direction = Direction.DESC) Pageable pageable,
			@RequestBody @Valid TitleOrAndIdProjectQueryDTO taskQueryDto) {
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Page<Task> tasks = taskRepository.findByTitleAndUser_IdNative(taskQueryDto.getTitle(), logged.getId(),
				pageable);

		Page<TaskDto> tasksDto = Task.convert(tasks);

		return ResponseEntity.ok().body(tasksDto);
	}

	@PostMapping("/list-by-project-filter")
	public ResponseEntity<Page<TaskDto>> listByProjectId(
			@PageableDefault(sort = "dateTimeEnd", page = 0, size = 10, direction = Direction.ASC) Pageable pageable,
			@RequestBody @Valid TitleOrAndIdProjectQueryDTO taskQueryDto) {
		User logged= (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Page<Task> tasks = taskRepository.findByProject_IdAndUser(taskQueryDto.getProjectId(), logged, pageable);

		Page<TaskDto> tasksDto = Task.convert(tasks);

		return ResponseEntity.ok().body(tasksDto);
	}

	@GetMapping("/{id}")
	public ResponseEntity<TaskDto> detail(@PathVariable("id") Long id) {
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Optional<Task> task = taskRepository.findByIdAndUser(id, logged);

		TaskDto taskDto = new TaskDto(task.get());

		return ResponseEntity.ok().body(taskDto);
	}

	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<TaskDto> update(@PathVariable("id") Long id,
			@RequestBody @Valid RegisterTaskForm taskForm) {
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Optional<Task> optionalTask = taskRepository.findByIdAndUser(id, logged);

		if (optionalTask.isPresent()) {
			Task taskValidator = taskForm.converter(logged, projectRepository);
			TaskDto taskDtoValidator;

			taskDtoValidator = taskService.taskValidator(taskValidator, logged, taskRepository, id);

			if (taskDtoValidator.isHasIssues())
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.header("TimeConflict", DefaultMessages.TASK_BAD_REQUEST.getMessage()).body(taskDtoValidator);

			Task task = taskForm.update(id, taskRepository, projectRepository);

			if (task.getProject() != null) {
				Optional<Project> project = projectRepository.findByIdAndUser(task.getProject().getId(), logged);
				project.get().setProgressStatus(taskService
						.setProjectFinishedStatusByTasks(taskRepository.findByProjectAndUser(project.get(), logged)));
				projectRepository.save(project.get());
			}

			if (optionalTask.get().getNotifications() != null)
				notificationRepository.deleteByTask(optionalTask.get());

			if (taskForm.getNotifications() != null) {
				task.setNotifications(taskService.notificationPattern(task.getNotifications()));
				for (Notification n : taskForm.getNotifications()) {
					Notification notification = new Notification(n, optionalTask.get());
					notificationRepository.save(notification);
				}
			}

			return ResponseEntity.ok(new TaskDto(task));
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("/list-by-no-project")
	public ResponseEntity<Page<TaskDto>> listByTitleNoProject(
			@PageableDefault(sort = "title", page = 0, size = 10, direction = Direction.DESC) Pageable pageable,
			@RequestBody @Valid TitleOrAndIdProjectQueryDTO taskQueryDto) {

		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Page<Task> tasks = taskRepository.findByTitleAndAndUser_IdAndProjectIsNullOrProjectIsEqualNative(
				taskQueryDto.getTitle(), logged.getId(), taskQueryDto.getProjectId(), pageable);

		Page<TaskDto> tasksDto = Task.convert(tasks);

		return ResponseEntity.ok().body(tasksDto);
	}
}
