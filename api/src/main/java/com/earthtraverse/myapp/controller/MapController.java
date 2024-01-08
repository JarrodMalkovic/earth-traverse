package com.earthtraverse.myapp.controller;

import com.earthtraverse.myapp.entity.Map;
import com.earthtraverse.myapp.service.MapService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/maps")
@RequiredArgsConstructor
public class MapController {
    private static final int MAXIMUM_PAGE_SIZE = 100;
    private final MapService mapService;

    /**
     * Get a page of Maps with the specified page number and size.
     *
     * @param pageNumber The number of the page to retrieve.
     * @param pageSize   The number of Maps in a page.
     * @return A page of Maps.
     * @throws ResponseStatusException if the page size is greater than the maximum page size or less than 1.
     */
    @GetMapping
    public Page<Map> getAllMaps(
            @RequestParam(defaultValue = "0") Integer pageNumber,
            @RequestParam(defaultValue = "20") Integer pageSize
    ) {
        if (pageSize > MAXIMUM_PAGE_SIZE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, String.format("Page size must not exceed %d", MAXIMUM_PAGE_SIZE)
            );
        }

        if (pageSize <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Page size must be greater than 0"
            );
        }

        return mapService.getMaps(pageNumber, pageSize);
    }
}
