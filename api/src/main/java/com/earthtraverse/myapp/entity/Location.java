package com.earthtraverse.myapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double latitude;

    private Double longitude;

    private String country;

    private String resourceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "map_id")
    @JsonBackReference
    private Map map;
}