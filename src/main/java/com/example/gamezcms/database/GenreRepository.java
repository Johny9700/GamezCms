package com.example.gamezcms.database;

import com.example.gamezcms.database.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

//    @Query("select a from animals a where a.owner.id = :ownerId")
//    List<Animal> getOwnerAnimals(@Param("ownerId") Long ownerId);
//
    @Modifying
    @Transactional
    @Query(value = "insert into genres (name) values (:name)", nativeQuery = true)
    int addGenre(@Param("name") String name);

    @Modifying
    @Transactional
    @Query(value = "update genres set name = :name where id = :id", nativeQuery = true)
    int modifyGenre(@Param("id") Long id,@Param("name") String name);
}
