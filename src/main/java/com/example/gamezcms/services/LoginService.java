package com.example.gamezcms.services;

import com.example.gamezcms.database.UserRepository;
import com.example.gamezcms.database.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import static org.springframework.security.crypto.bcrypt.BCrypt.checkpw;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public boolean register(RegisterCredentials credentials) {
        User user = userRepository.getUserByUserName(credentials.getLogin());
        if (user != null) {
            return false;
        }
        String pw_hash = BCrypt.hashpw(credentials.getPassword(), BCrypt.gensalt());
        int inserted = userRepository.createUser(credentials.getLogin(), pw_hash, credentials.getMail(),"user");
        return inserted > 0;
    }

    public boolean login(Credentials credentials) {
        User user = userRepository.getUserByUserName(credentials.getLogin());
        if (user == null){
            return false;
        }
        return checkpw(credentials.getPassword(), user.getPassword());
    }

    public boolean isAdmin(Credentials credentials) {
        User user = userRepository.getUserByUserName(credentials.getLogin());
        if (user == null){
            return false;
        }
        return "admin".equals(user.getRole());
    }
}
