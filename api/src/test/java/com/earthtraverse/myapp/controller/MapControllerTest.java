package com.earthtraverse.myapp.controller;

import com.earthtraverse.myapp.repository.MapRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(MapController.class)
public class MapControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MapRepository mapRepository;

    @Test
    @WithMockUser
    public void getAllMaps() throws Exception {

    }
}