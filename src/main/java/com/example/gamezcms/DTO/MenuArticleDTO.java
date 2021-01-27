package com.example.gamezcms.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MenuArticleDTO {
    private Long id;
    private String name;
    private boolean isPublished;
}
