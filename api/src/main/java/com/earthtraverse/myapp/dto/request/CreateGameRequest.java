package com.earthtraverse.myapp.dto.request;

import lombok.Value;

import javax.validation.constraints.NotBlank;

@Value
public class CreateGameRequest {
    @NotBlank
    private Long mapId;

    @NotBlank
    private int numberOfRounds;
}
