package com.example.gamezcms.database;

import com.example.gamezcms.database.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from users u where u.userName = :userLogin")
    User getUserByUserName(@Param("userLogin") String userLogin);

    @Modifying
    @Transactional
    @Query(value = "insert into users (user_name, password, mail, role) values (:login, :password, :mail, :role)", nativeQuery = true)
    int createUser(@Param("login") String login, @Param("password") String password, @Param("mail") String mail, @Param("role") String role);

    @Modifying
    @Transactional
    @Query(value = "update users set role = :role where id = :id", nativeQuery = true)
    int updateUserRole(@Param("id") Long id,  @Param("role") String role);
}
