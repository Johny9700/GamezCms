package com.example.gamezcms.database.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity(name="users")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String userName;
    @JsonIgnore
    private String password;
    private String mail;
    private String role;
}
