package io.adagio.adagioapi.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

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
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.ProjectDto;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.dto.relatoryDto.ReturnedRelatoryProjectSetData;
import io.adagio.adagioapi.dto.relatoryDto.ReturnedRelatoryTaskSetData;

@Service
public class ReturnedRelatoryTaskSetDataExcelExporter {

	  public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	  static String[] TASKS_HEADERs = { "Id", "Title", "Description", "Priority" };
	  static String[] PROJECTS_HEADERs = { "Id", "Title", "Description", "Progress" };
	  
	  static String SHEET_TASKS = "Tasks";
	  static String SHEET_PROJECTS = "Projects";
	  
	  public ByteArrayInputStream load(ReturnedRelatoryTaskSetData relatory) {
	    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
	      Sheet sheet = workbook.createSheet(SHEET_TASKS);
	      // Header
	      
	      CellStyle headerCellStyle = workbook.createCellStyle();
	      headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
	      headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        
	      Row metaInformationRow = sheet.createRow(0);
	      
	      Cell cellTotalTasks = metaInformationRow.createCell(0);
	      cellTotalTasks.setCellValue("Número de tarefas: ");
	      Cell cellTotalTasksInformation = metaInformationRow.createCell(1);
	      cellTotalTasksInformation.setCellValue(relatory.getQuantityOfElements());
	      
	      Row metaInformationRowHours = sheet.createRow(1);
	      
	      Cell cellTotalHours = metaInformationRowHours.createCell(0);
	      cellTotalHours.setCellValue("Total de horas: ");
	      Cell cellTotalHoursInformation = metaInformationRowHours.createCell(1);
	      cellTotalHoursInformation.setCellValue(relatory.getTotalHours());
	      
	      Row metaInformationRowDivider = sheet.createRow(2);
	      
	      Cell cellDivider = metaInformationRowDivider.createCell(0);
	      cellDivider.setCellValue("");
	      Cell cellDivider2 = metaInformationRowDivider.createCell(1);
	      cellDivider2.setCellValue("");
	      
	      Row headerRow = sheet.createRow(3);
	      for (int col = 0; col < TASKS_HEADERs.length; col++) {
	        Cell cell = headerRow.createCell(col);
	        cell.setCellValue(TASKS_HEADERs[col]);
	        cell.setCellStyle(headerCellStyle);
	        
	      }
	      int rowIdx = 4;
	      for (TaskDto task : relatory.getTasks()) {
	        Row row = sheet.createRow(rowIdx++);
	        row.createCell(0).setCellValue(task.getId());
	        row.createCell(1).setCellValue(task.getTitle());
	        row.createCell(2).setCellValue(task.getDescription());
	        row.createCell(3).setCellValue(task.getPriority().toString());
	      }
	      
	      sheet.autoSizeColumn(0);
	      sheet.autoSizeColumn(1);
	      sheet.autoSizeColumn(2);
	      sheet.autoSizeColumn(3);
	      
	      workbook.write(out);
	      return new ByteArrayInputStream(out.toByteArray());
	    } catch (IOException e) {
	      throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
	    }
	  }
	  
	  public ByteArrayInputStream loadProjects(ReturnedRelatoryProjectSetData relatory) {
		    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
		      Sheet sheet = workbook.createSheet(SHEET_PROJECTS);
		      // Header
		      
		      CellStyle headerCellStyle = workbook.createCellStyle();
		      headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
		      headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	        
		      Row metaInformationRow = sheet.createRow(0);
		      
		      Cell cellTotalTasks = metaInformationRow.createCell(0);
		      cellTotalTasks.setCellValue("Número de projetos: ");
		      Cell cellTotalTasksInformation = metaInformationRow.createCell(1);
		      cellTotalTasksInformation.setCellValue(relatory.getQuantityOfElements());
		      
		      Row metaInformationRowHours = sheet.createRow(1);
		      
		      Cell cellTotalHours = metaInformationRowHours.createCell(0);
		      cellTotalHours.setCellValue("Total de horas: ");
		      Cell cellTotalHoursInformation = metaInformationRowHours.createCell(1);
		      cellTotalHoursInformation.setCellValue(relatory.getTotalHours());
		      
		      Row metaInformationRowDivider = sheet.createRow(2);
		      
		      Cell cellDivider = metaInformationRowDivider.createCell(0);
		      cellDivider.setCellValue("");
		      Cell cellDivider2 = metaInformationRowDivider.createCell(1);
		      cellDivider2.setCellValue("");
		      
		      Row headerRow = sheet.createRow(3);
		      for (int col = 0; col < PROJECTS_HEADERs.length; col++) {
		        Cell cell = headerRow.createCell(col);
		        cell.setCellValue(PROJECTS_HEADERs[col]);
		        cell.setCellStyle(headerCellStyle);
		        
		      }
		      int rowIdx = 4;
		      for (ProjectDto project : relatory.getProjects()) {
		        Row row = sheet.createRow(rowIdx++);
		        row.createCell(0).setCellValue(project.getId());
		        row.createCell(1).setCellValue(project.getTitle());
		        row.createCell(2).setCellValue(project.getDescription());
		        row.createCell(3).setCellValue(project.getProgress());
		      }
		      
		      sheet.autoSizeColumn(0);
		      sheet.autoSizeColumn(1);
		      sheet.autoSizeColumn(2);
		      sheet.autoSizeColumn(3);
		      
		      workbook.write(out);
		      return new ByteArrayInputStream(out.toByteArray());
		    } catch (IOException e) {
		      throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
		    }
		  }
}






