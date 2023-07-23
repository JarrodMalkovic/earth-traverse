package com.earthtraverse.myapp.service;

import com.earthtraverse.myapp.entity.Map;
import com.earthtraverse.myapp.repository.MapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MapService {
    private final MapRepository mapRepository;

    /**
     * Retrieves a paginated list of maps.
     *
     * @param pageNumber The number of the page to retrieve
     * @param pageSize   The size of the pages to retrieve
     * @return A page of maps
     */
    public Page<Map> getMaps(int pageNumber, int pageSize) {
        return mapRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }
}