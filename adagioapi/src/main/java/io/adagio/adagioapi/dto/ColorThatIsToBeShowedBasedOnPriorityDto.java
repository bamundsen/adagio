package io.adagio.adagioapi.dto;

import java.util.List;

import io.adagio.adagioapi.models.ColorOfPriority;
import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Task;

public class ColorThatIsToBeShowedBasedOnPriorityDto {

	private ColorOfPriority colorThatIsToBeShowed;
	
	private ColorThatIsToBeShowedBasedOnPriorityDto() {}
	
	public ColorThatIsToBeShowedBasedOnPriorityDto(ColorOfPriority color) {
		this.colorThatIsToBeShowed = color;
	}
	
	public ColorOfPriority getColorThatIsToBeShowed() {
		return colorThatIsToBeShowed;
	}
	
	private static ColorOfPriority verifyGreaterNumberAndReturnColor(int low, int regular, int high, int critical) {
		if(critical >= 1) {
			return ColorOfPriority.RED;
		} else if(high >= 1) {
			return ColorOfPriority.GREEN;
		} else if(regular >= 1) {
			return ColorOfPriority.BLUE;
		} else if(low >= 1) {
			return ColorOfPriority.GRAY;
		}
		
		return null;
	}
	
	public static ColorOfPriority defineColorThatIsToBeShowed(List<Task> tasks) {
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
		
		ColorOfPriority cor = verifyGreaterNumberAndReturnColor(quantityOfLow,quantityOfRegular,quantityOfHigh,quantityOfCritical);
		
		return cor;
	}
}
