package com.earthtraverse.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class EarthtraverseApplication {

    public static void main(String[] args) {
        SpringApplication.run(EarthtraverseApplication.class, args);
    }

}
