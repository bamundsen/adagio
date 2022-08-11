package io.adagio.adagioapi.controllers;



import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.adagio.adagioapi.dto.RelatoryQueryDto;
import io.adagio.adagioapi.dto.relatoryDto.ReturnedRelatoryProjectSetData;
import io.adagio.adagioapi.dto.relatoryDto.ReturnedRelatoryTaskSetData;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.services.RelatoryService;
import io.adagio.adagioapi.utils.RelatoryBy;
import io.adagio.adagioapi.utils.ReturnedRelatorySetDataExcelExporter;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/relatory")
public class RelatoryController {

	@Autowired
	private RelatoryService relatoryService;
	
	@Autowired
	private ReturnedRelatorySetDataExcelExporter excelExporter;
	
	@PostMapping("/get-by-month")
	public ResponseEntity<Resource> getByMonth(HttpServletResponse response, @RequestBody @Valid RelatoryQueryDto dto){
		
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		ReturnedRelatoryTaskSetData tasksRelatory = relatoryService.getByMonth(logged,dto.getMonth(),dto.getYear(), RelatoryBy.TASKS_BY_MONTH);
		
		String filename = "tasks.xlsx";
	    InputStreamResource file = new InputStreamResource(excelExporter.load(tasksRelatory));
	   
	    return ResponseEntity.ok()
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
	            .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	            .body(file);
	}
	
	@PostMapping("/get-by-year")
	public ResponseEntity<Resource> getByYear(@RequestBody @Valid RelatoryQueryDto dto){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		ReturnedRelatoryTaskSetData tasksRelatory = relatoryService.getByMonth(logged, dto.getMonth(), dto.getYear(), RelatoryBy.TASKS_BY_YEAR);
		
		String filename = "tasks.xlsx";
		InputStreamResource file = new InputStreamResource(excelExporter.load(tasksRelatory));
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION,  "attachment; filename=" + filename)
	            .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	            .body(file);
	}
	
	@PostMapping("/get-by-day")
	public ResponseEntity<Resource> getByDay(@RequestBody @Valid RelatoryQueryDto dto){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		ReturnedRelatoryTaskSetData tasksRelatory = relatoryService.getByDay(logged, dto.getStartDate(), dto.getEndDate(), RelatoryBy.TASKS_BY_DAY);
		
		String filename = "tasks.xlsx";
		InputStreamResource file = new InputStreamResource(excelExporter.load(tasksRelatory));
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION,  "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	            .body(file);
	}
	
	@GetMapping("/get-projects-by-page")
	public ResponseEntity<Resource> getProjectsByPage(@PageableDefault(sort="dateTimeEnd", size=10, page=0,
			direction=Direction.ASC) Pageable pagination){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		ReturnedRelatoryProjectSetData projectsRelatory = relatoryService.getProjectsByPage(logged, pagination);
		
		String filename = "projects.xlsx";
		InputStreamResource file = new InputStreamResource(excelExporter.loadProjects(projectsRelatory));
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION,  "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	            .body(file);
	}
	
	
	@PostMapping("/get-tasks-by-page-and-project")
	public ResponseEntity<Resource> getTasksByProjectAndPage(@PageableDefault(sort="dateTimeEnd", size=10, page=0,
										direction=Direction.ASC) Pageable pagination,@RequestBody @Valid RelatoryQueryDto dto){
		
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		ReturnedRelatoryTaskSetData tasksRelatory = relatoryService.getByPageAndProject(logged, dto.getIdProject(), pagination);
		
		String filename = "tasks.xlsx";
		InputStreamResource file = new InputStreamResource(excelExporter.load(tasksRelatory));
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION,  "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	            .body(file);
	}
}

