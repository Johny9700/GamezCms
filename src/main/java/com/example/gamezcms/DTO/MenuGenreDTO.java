package com.example.gamezcms.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MenuGenreDTO {
    private Long id;
    private String name;
    private List<MenuArticleDTO> articlesList;
}
