package com.example.gamezcms.api;

import com.example.gamezcms.DTO.MenuGenreDTO;
import com.example.gamezcms.database.GenreRepository;
import com.example.gamezcms.database.PostRepository;
import com.example.gamezcms.database.UserRepository;
import com.example.gamezcms.database.models.Post;
import com.example.gamezcms.database.models.User;
import com.example.gamezcms.services.Credentials;
import com.example.gamezcms.services.LoginService;
import com.example.gamezcms.services.MenuService;
import com.example.gamezcms.services.RegisterCredentials;
import javafx.geometry.Pos;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@RestController
@RequestMapping("/api")
public class api {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;

    private final MenuService menuService;
    private final LoginService loginService;

    @GetMapping("/menu")
    public List<MenuGenreDTO> fetchMenuItems(){
        return menuService.fetchMenu();
    }

    @GetMapping("/article")
    public Post fetchArticle(@RequestParam String id){
        return postRepository.getPostById(Long.parseLong(id));
    }

    @PostMapping("/add-article")
    public ResponseEntity addArticle(@RequestHeader("login") String login, @RequestHeader("password") String password, @RequestBody Post post) {
        if(loginService.login(new Credentials(login, password))){
            boolean inserted = postRepository.createArticle(post.getTitle(), post.getContent(), post.getUser().getId(), post.getGenre().getId(), post.getPublicationDate(), post.getIsPublished()) > 0;
            return new ResponseEntity(inserted, HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/modify-article")
    public ResponseEntity modifyArticle(@RequestHeader("login") String login, @RequestHeader("password") String password, @RequestBody Post post) {
        if(loginService.login(new Credentials(login, password))  && loginService.isAdmin(new Credentials(login, password))){
            boolean inserted = postRepository.modifyArticle(post.getId(), post.getTitle(), post.getContent(), post.getUser().getId(), post.getGenre().getId(), post.getPublicationDate(), post.getIsPublished()) > 0;
            return new ResponseEntity(inserted, HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public boolean register(@RequestBody RegisterCredentials registerCredentials) {
        return loginService.register(registerCredentials);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Credentials credentials){
        return loginService.login(credentials);
    }

    @PostMapping("/user")
    public ResponseEntity register(@RequestBody Credentials credentials) {
        if(loginService.login(credentials)){
            return new ResponseEntity(userRepository.getUserByUserName(credentials.getLogin()), HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

    }

    @PostMapping("/genres")
    public ResponseEntity getGenres(@RequestBody Credentials credentials) {
        if(loginService.login(credentials)){
            return new ResponseEntity(genreRepository.findAll(), HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/add-genre")
    public ResponseEntity addGenre(@RequestHeader("login") String login, @RequestHeader("password") String password, @RequestBody MenuGenreDTO genre) {
        if(loginService.login(new Credentials(login, password))){
            boolean genreExist = genreRepository.findAll().stream().anyMatch(dbgenre -> dbgenre.getName().equals(genre.getName()));
            if(!genreExist){
                genreRepository.addGenre(genre.getName());
            }
            return new ResponseEntity(genreExist, HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/delete-genre")
    public ResponseEntity deleteGenre(@RequestHeader("login") String login, @RequestHeader("password") String password, @RequestBody MenuGenreDTO genre) {
        if(loginService.login(new Credentials(login, password))){
            boolean genreHavePost = postRepository.findAll().stream().anyMatch(post -> post.getGenre().getId().equals(genre.getId()));
            if(!genreHavePost){
                genreRepository.deleteById(genre.getId());
            }
            return new ResponseEntity(genreHavePost, HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/edit-genre")
    public ResponseEntity editGenre(@RequestHeader("login") String login, @RequestHeader("password") String password, @RequestBody MenuGenreDTO genre) {
        if(loginService.login(new Credentials(login, password))){
            genreRepository.modifyGenre(genre.getId(), genre.getName());
            return new ResponseEntity(true, HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/users")
    public ResponseEntity getUsers(@RequestBody Credentials credentials) {
        if(loginService.login(credentials) && loginService.isAdmin(credentials)){
            return new ResponseEntity(userRepository.findAll(), HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/change-role")
    public ResponseEntity changeUserRole(@RequestHeader("login") String login, @RequestHeader("password") String password, @RequestBody User user) {
        if(loginService.login(new Credentials(login, password))){
            userRepository.updateUserRole(user.getId(), user.getRole());
            return new ResponseEntity(true, HttpStatus.OK);
        }else{
            return new ResponseEntity("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }
}
