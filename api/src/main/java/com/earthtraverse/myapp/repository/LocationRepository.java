package com.earthtraverse.myapp.repository;

import com.earthtraverse.myapp.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM Location WHERE map_id = :mapId ORDER BY RANDOM() LIMIT :n")
    List<Location> findRandomLocationsByMapId(@Param("mapId") Long mapId, @Param("n") int n);
}