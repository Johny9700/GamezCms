package com.example.gamezcms.database;

import com.example.gamezcms.database.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("select p from posts p where p.id = :postId")
    Post getPostById(@Param("postId") Long postId);

    @Modifying
    @Transactional
    @Query(value = "insert into posts (title, content, author_id, genre_id, publication_date, is_published) values (:title, :content, :author_id, :genre_id, :publication_date, :is_published)", nativeQuery = true)
    int createArticle(@Param("title") String title, @Param("content") String content, @Param("author_id") Long author_id, @Param("genre_id") Long genre_id, @Param("publication_date") Date publication_date, @Param("is_published") boolean is_published );

    @Modifying
    @Transactional
    @Query(value = "update posts set title = :title, content = :content, author_id = :author_id, genre_id = :genre_id, publication_date = :publication_date, is_published = :is_published where id = :id", nativeQuery = true)
    int modifyArticle(@Param("id") Long id,@Param("title") String title, @Param("content") String content, @Param("author_id") Long author_id, @Param("genre_id") Long genre_id, @Param("publication_date") Date publication_date, @Param("is_published") boolean is_published );
}
