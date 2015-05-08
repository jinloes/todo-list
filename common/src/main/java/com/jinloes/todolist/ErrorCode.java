package com.jinloes.todolist;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Created by jinloes on 5/8/15.
 */
public enum ErrorCode {
    INVALID_CREDENTIALS("ERR-01", "Invalid credentials.", "Please check your username/password.");

    private final String code;
    private final String message;
    private final String resolution;

    ErrorCode(String code, String message, String resolution) {
        this.code = code;
        this.message = message;
        this.resolution = resolution;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getResolution() {
        return resolution;
    }
}
