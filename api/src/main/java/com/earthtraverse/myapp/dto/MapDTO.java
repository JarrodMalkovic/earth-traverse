package com.earthtraverse.myapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MapDTO {
    private Long id;
    private String title;
    private String description;
    private String image;
}
