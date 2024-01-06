package com.earthtraverse.myapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoundDTO {
    private Long id;
    private int number;
    private LocationDTO location;
}
