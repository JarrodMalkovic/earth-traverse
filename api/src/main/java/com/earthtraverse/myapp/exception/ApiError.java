package com.earthtraverse.myapp.exception;

import lombok.Value;
import org.springframework.http.HttpStatus;

@Value
public class ApiError {
    private HttpStatus status;
    private String message;
}