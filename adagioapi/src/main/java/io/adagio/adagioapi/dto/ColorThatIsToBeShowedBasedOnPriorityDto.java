package io.adagio.adagioapi.dto;

import java.util.List;

import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Task;

public class ColorThatIsToBeShowedBasedOnPriorityDto {

	private String colorThatIsToBeShowed;
	
	private ColorThatIsToBeShowedBasedOnPriorityDto() {}
	
	public ColorThatIsToBeShowedBasedOnPriorityDto(String color) {
		this.colorThatIsToBeShowed = color;
	}
	
	public String getColorThatIsToBeShowed() {
		return colorThatIsToBeShowed;
	}
	
	private static String verifyGreaterNumberAndReturnColor(int low, int regular, int high, int critical) {
		if(low > regular && low > high && low > critical) {
			return "#CCCCCC";
		} else if(regular > low && regular > high && regular > critical) {
			return "#00FF00";
		} else if(high > low && high > regular && high > critical) {
			return "#0000FF";
		} else if(critical > low && critical > regular && critical > high || (critical > high && critical > regular)) {
			return "#FF0000";
		}
		
		return "#50e26d";
	}
	
	public static String defineColorThatIsToBeShowed(List<Task> tasks) {
		int quantityOfLow = 0;
		int quantityOfRegular = 0;
		int quantityOfHigh = 0;
		int quantityOfCritical = 0;
		
		for(Task task : tasks) {
			if(task.getPriority() == Priority.LOW) {
				quantityOfLow++;
			} else if(task.getPriority() == Priority.REGULAR) {
				quantityOfRegular++;
			} else if(task.getPriority() == Priority.HIGH) {
				quantityOfHigh++;
			} else if(task.getPriority() == Priority.CRITICAL) {
				quantityOfCritical++;
			}
		}
		
		String hexadecimal = verifyGreaterNumberAndReturnColor(quantityOfLow,quantityOfRegular,quantityOfHigh,quantityOfCritical);
		
		return "";
	}
}
