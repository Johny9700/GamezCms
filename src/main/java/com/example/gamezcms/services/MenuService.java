package com.example.gamezcms.services;

import com.example.gamezcms.DTO.MenuArticleDTO;
import com.example.gamezcms.DTO.MenuGenreDTO;
import com.example.gamezcms.database.GenreRepository;
import com.example.gamezcms.database.PostRepository;
import com.example.gamezcms.database.models.Genre;
import com.example.gamezcms.database.models.Post;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Data
@Service
public class MenuService {

    private final GenreRepository genreRepository;
    private final PostRepository postRepository;

    public List<MenuGenreDTO> fetchMenu() {
        List<MenuGenreDTO> menuGenreDTOs = new ArrayList<>();
        List<Post> posts = postRepository.findAll();
        posts.forEach(post -> {
            Genre genre = post.getGenre();
            if(menuGenreDTOs.stream().map(MenuGenreDTO::getId).noneMatch(id -> id.equals(genre.getId()))) {
                MenuGenreDTO newGenre = new MenuGenreDTO(genre.getId(), genre.getName(), new ArrayList<>());
                menuGenreDTOs.add(newGenre);
            }

            for (MenuGenreDTO g: menuGenreDTOs ){
                if (g.getId().equals(post.getGenre().getId())){
                    g.getArticlesList().add(new MenuArticleDTO(post.getId(), post.getTitle(), post.getIsPublished()));
                    break;
                }
            }
        });
        return menuGenreDTOs;
    }
}
