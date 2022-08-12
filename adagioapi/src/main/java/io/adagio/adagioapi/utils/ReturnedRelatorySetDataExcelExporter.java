package io.adagio.adagioapi.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.ProjectDto;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.dto.relatoryDto.ReturnedRelatoryProjectSetData;
import io.adagio.adagioapi.dto.relatoryDto.ReturnedRelatoryTaskSetData;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.UserRepository;

@Service
public class ReturnedRelatorySetDataExcelExporter {

	  public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	  
	  private ArrayList<String> taskHeaders = new ArrayList<String>(Arrays.asList( "Título", "Descrição", "Prioridade", "Data inicial", "Data final" ));
	  private ArrayList<String> projectHeaders = new ArrayList<String>(Arrays.asList("Título", "Descrição", "Progresso","Quantidade de tarefas","Data inicial", "Data final")) ;
	  
	  static String SHEET_TASKS = "Tasks";
	  static String SHEET_PROJECTS = "Projects";
	  
	  @Autowired
	  private ProjectRepository projectRepository;
	  
	  @Autowired
	  private UserRepository userRepository;
	  
	  public ByteArrayInputStream load(ReturnedRelatoryTaskSetData relatory, PaginatedSetOrNot paginated) {
	    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
	    	int acumulatedRows= 0;
	      Sheet sheet = workbook.createSheet(SHEET_TASKS);
	      // Header
	      
	      CellStyle headerCellStyle = workbook.createCellStyle();
	      headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
	      headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        
	      Row metaInformationRow = sheet.createRow(acumulatedRows++);
	      
	      Cell cellTotalTasks = metaInformationRow.createCell(0);
	      cellTotalTasks.setCellValue("Número de tarefas: ");
	      Cell cellTotalTasksInformation = metaInformationRow.createCell(1);
	      cellTotalTasksInformation.setCellValue(relatory.getQuantityOfElements());
	      
	      Row metaInformationRowHours = sheet.createRow(acumulatedRows++);
	      
	      Cell cellTotalHours = metaInformationRowHours.createCell(0);
	      cellTotalHours.setCellValue("Total de horas: ");
	      Cell cellTotalHoursInformation = metaInformationRowHours.createCell(1);
	      cellTotalHoursInformation.setCellValue(relatory.getTotalHours());
	        
	      if(paginated == PaginatedSetOrNot.PAGINATED) {
	    	  Row metaInformationProjectTitle = sheet.createRow(acumulatedRows++);
		      
		      Cell cellProjectTitle = metaInformationProjectTitle.createCell(0);
		      cellProjectTitle.setCellValue("Título do projeto dessas tarefas: ");
		      Cell cellProjectTitleValue = metaInformationProjectTitle.createCell(1);
		      cellProjectTitleValue.setCellValue(relatory.getProjectName());
	    	  Row metaInformationPage = sheet.createRow(acumulatedRows++);
		      
		      Cell cellPage = metaInformationPage.createCell(0);
		      cellPage.setCellValue("Página: ");
		      Cell cellPageValue = metaInformationPage.createCell(1);
		      cellPageValue.setCellValue(relatory.getPage());
	      }
	      
	      Row metaInformationRowDivider = sheet.createRow(acumulatedRows++);
	      
	      Cell cellDivider = metaInformationRowDivider.createCell(0);
	      cellDivider.setCellValue("");
	      Cell cellDivider2 = metaInformationRowDivider.createCell(1);
	      cellDivider2.setCellValue("");
	      

	      Row headerRow = sheet.createRow(acumulatedRows++);
	      for (int col = 0; col < taskHeaders.size(); col++) {
	        Cell cell = headerRow.createCell(col);
	        cell.setCellValue(taskHeaders.get(col));
	        cell.setCellStyle(headerCellStyle);
	        
	        if(col == taskHeaders.size() - 1 && paginated == PaginatedSetOrNot.NOT_PAGINATED) {
	        	Cell extraCell = headerRow.createCell(col+1);
		        extraCell.setCellValue("Título do projeto dessa tarefa: ");
		        extraCell.setCellStyle(headerCellStyle);
	        }
	      }
	      
	      for (TaskDto task : relatory.getTasks()) {
	        Row row = sheet.createRow(acumulatedRows++);
	        row.createCell(0).setCellValue(task.getTitle());
	        row.createCell(1).setCellValue(task.getDescription());
	        row.createCell(2).setCellValue(task.getPriority().toString());
	        row.createCell(3).setCellValue(extractFormattedDateTime(task.getDateTimeStart()));
	        row.createCell(4).setCellValue(extractFormattedDateTime(task.getDateTimeEnd()));
	        
	        if(paginated == PaginatedSetOrNot.NOT_PAGINATED) {
		    	  row.createCell(5).setCellValue(extractProjectName(task.getIdProject(), task.getIdUser()));
		      }
	      }
	      
	      sheet.autoSizeColumn(0);
	      sheet.autoSizeColumn(1);
	      sheet.autoSizeColumn(2);
	      sheet.autoSizeColumn(3);
	      sheet.autoSizeColumn(4);
	      
	      if(paginated == PaginatedSetOrNot.NOT_PAGINATED) {
	    	  sheet.autoSizeColumn(5);
	      }
	      
	      workbook.write(out);
	      return new ByteArrayInputStream(out.toByteArray());
	    } catch (IOException e) {
	      throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
	    }
	  }
	  
	  public ByteArrayInputStream loadProjects(ReturnedRelatoryProjectSetData relatory,PaginatedSetOrNot paginated) {
		    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
		      int acumulatedRows = 0;
		      
		      Sheet sheet = workbook.createSheet(SHEET_PROJECTS);
		      // Header
		      
		      CellStyle headerCellStyle = workbook.createCellStyle();
		      headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
		      headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	        
		      Row metaInformationRow = sheet.createRow(acumulatedRows++);
		      
		      Cell cellTotalTasks = metaInformationRow.createCell(0);
		      cellTotalTasks.setCellValue("Número de projetos: ");
		      Cell cellTotalTasksInformation = metaInformationRow.createCell(1);
		      cellTotalTasksInformation.setCellValue(relatory.getQuantityOfElements());
		      
		      Row metaInformationRowHours = sheet.createRow(acumulatedRows++);
		      
		      Cell cellTotalHours = metaInformationRowHours.createCell(0);
		      cellTotalHours.setCellValue("Total de horas: ");
		      Cell cellTotalHoursInformation = metaInformationRowHours.createCell(1);
		      cellTotalHoursInformation.setCellValue(relatory.getTotalHours());
		      
		      if(paginated == PaginatedSetOrNot.PAGINATED) {
		    	  Row pageRowInformation = sheet.createRow(acumulatedRows++);
		    	  
		    	  Cell cellPage = pageRowInformation.createCell(0);
		    	  cellPage.setCellValue("Página: ");
		    	  Cell cellPageValue = pageRowInformation.createCell(1);
		    	  cellPageValue.setCellValue(relatory.getPage());
		      }
		      
		      Row metaInformationRowDivider = sheet.createRow(acumulatedRows++);
		      
		      Cell cellDivider = metaInformationRowDivider.createCell(0);
		      cellDivider.setCellValue("");
		      Cell cellDivider2 = metaInformationRowDivider.createCell(1);
		      cellDivider2.setCellValue("");
		      
		      Row headerRow = sheet.createRow(acumulatedRows++);
		      for (int col = 0; col < projectHeaders.size(); col++) {
		        Cell cell = headerRow.createCell(col);
		        cell.setCellValue(projectHeaders.get(col));
		        cell.setCellStyle(headerCellStyle);
		        
		      }
		    
		      for (ProjectDto project : relatory.getProjects()) {
		        Row row = sheet.createRow(acumulatedRows++);
		        row.createCell(0).setCellValue(project.getTitle());
		        row.createCell(1).setCellValue(project.getDescription());
		        row.createCell(2).setCellValue(project.getProgress()+" %");
		        row.createCell(3).setCellValue(project.getTasks().size());
		        row.createCell(4).setCellValue(extractFormattedDateTime(project.getDateTimeStart()));
		        row.createCell(5).setCellValue(extractFormattedDateTime(project.getDateTimeEnd()));
		      }
		      
		      sheet.autoSizeColumn(0);
		      sheet.autoSizeColumn(1);
		      sheet.autoSizeColumn(2);
		      sheet.autoSizeColumn(3);
		      sheet.autoSizeColumn(4);
		      sheet.autoSizeColumn(5);
		      
		      workbook.write(out);
		      return new ByteArrayInputStream(out.toByteArray());
		    } catch (IOException e) {
		      throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
		    }
	}
	  
	  private String extractFormattedDateTime(LocalDateTime localDateTime) {
		  DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
		  
		  return localDateTime.format(dateTimeFormatter);
	  }
	  
	  private String extractProjectName(Long idProject, Long idUser) {
		  
		  User logged = userRepository.getById(idUser);
		  
		  if(idProject == null) {
			  return "Sem projeto";
		  }
		  
		  Optional<Project> project = projectRepository.findByIdAndUser(idProject, logged);
		  
		  if(project.isEmpty()) {
			  return "Sem projeto";
		  }
		  
		  return project.get().getTitle();
	  }
}






