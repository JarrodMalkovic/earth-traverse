package com.earthtraverse.myapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationDTO {
    private Long id;
    private String resourceId;
    private Double latitude;
    private Double longitude;
    private String country;
}
