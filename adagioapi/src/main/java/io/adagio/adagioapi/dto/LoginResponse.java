package io.adagio.adagioapi.dto;

import io.adagio.adagioapi.models.User;

public class LoginResponse {

    private SuccessFailure status;
    private String message;
    private UserDto user;
//    private String accessToken;
    
    public LoginResponse() {}
    
    public LoginResponse(SuccessFailure status, String message, User user) {
    	this.status=status;
    	this.message = message;
    	this.user = new UserDto(user);
//    	this.accessToken=accessToken;
    }
    
    
    public enum SuccessFailure {
        SUCCESS, FAILURE
    }


	public SuccessFailure getStatus() {
		return status;
	}

	public UserDto getUser() {
		return user;
	}
	
//	public String getAccessToken() {
//		return accessToken;
//	}

	public String getMessage() {
		return message;
	}
    
    
}
