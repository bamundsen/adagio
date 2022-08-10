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

import io.adagio.adagioapi.dto.ReturnedRelatoryTaskSetData;
import io.adagio.adagioapi.dto.TaskDto;

@Service
public class ReturnedRelatoryTaskSetDataExcelExporter {

	  public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	  static String[] HEADERs = { "Id", "Title", "Description", "Priority" };
	  static String SHEET = "Tutorials";
	  
	  public ByteArrayInputStream load(ReturnedRelatoryTaskSetData relatory) {
	    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
	      Sheet sheet = workbook.createSheet(SHEET);
	      // Header
	      
	      CellStyle headerCellStyle = workbook.createCellStyle();
	      headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
	      headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        
	      Row metaInformationRow = sheet.createRow(0);
	      
	      Cell cellTotalTasks = metaInformationRow.createCell(0);
	      cellTotalTasks.setCellValue("Número de tarefas: ");
	      Cell cellTotalTasksInformation = metaInformationRow.createCell(1);
	      cellTotalTasksInformation.setCellValue(relatory.getQuantityOfTasks());
	      
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
	      for (int col = 0; col < HEADERs.length; col++) {
	        Cell cell = headerRow.createCell(col);
	        cell.setCellValue(HEADERs[col]);
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
}






