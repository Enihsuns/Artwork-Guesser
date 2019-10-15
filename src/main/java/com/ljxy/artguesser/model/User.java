package com.ljxy.artguesser.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

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
}
