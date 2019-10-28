package com.ljxy.artguesser.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String email;

    /**
     * Password here is different from the one entered by user in the register page.
     * Password here is a MD5 encoded version of that one.
     */
    @Column(nullable = false)
    private String password;

    /**
     * All the game plays played by the user.
     */
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Play> plays = new ArrayList<>();

    /**
     * All the games created by the user.
     */
    @OneToMany(mappedBy = "createUser")
    @JsonManagedReference
    private List<Game> createdGames = new ArrayList<>();

    /**
     * Public empty constructor.
     */
    public User() {}

    /**
     * Constructor.
     * @param email Email.
     * @param password Password.
     */
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
