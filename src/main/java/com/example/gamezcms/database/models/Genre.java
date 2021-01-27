package com.example.gamezcms.database.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity(name="genres")
public class Genre {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
}
