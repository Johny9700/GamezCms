package com.example.gamezcms.services;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterCredentials extends Credentials {
    private String mail;
}
