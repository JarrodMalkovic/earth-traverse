package com.earthtraverse.myapp.repository;

import com.earthtraverse.myapp.entity.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MapRepository extends JpaRepository<Map, Long> {
    Page<Map> findAll(Pageable pageable);
}