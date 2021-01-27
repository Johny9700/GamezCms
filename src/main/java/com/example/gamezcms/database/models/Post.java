package com.example.gamezcms.database.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity(name="posts")
public class Post {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String content;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    private Date publicationDate;
    private Boolean isPublished;
}
