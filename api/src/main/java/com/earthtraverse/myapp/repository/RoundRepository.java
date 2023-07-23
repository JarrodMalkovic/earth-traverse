package com.earthtraverse.myapp.repository;

import com.earthtraverse.myapp.entity.Round;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoundRepository extends JpaRepository<Round, Long> {
}