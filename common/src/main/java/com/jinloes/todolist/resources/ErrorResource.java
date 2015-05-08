package com.jinloes.todolist.resources;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jinloes.todolist.ErrorCode;

/**
 * Created by jinloes on 5/8/15.
 */
public class ErrorResource {
    private final String errorCode;
    private final String message;
    private final String resolution;

    public ErrorResource(ErrorCode errorCode) {
        this.errorCode = errorCode.getCode();
        this.message = errorCode.getMessage();
        this.resolution = errorCode.getResolution();
    }

    @JsonProperty("error_code")
    public String getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }

    public String getResolution() {
        return resolution;
    }
}
