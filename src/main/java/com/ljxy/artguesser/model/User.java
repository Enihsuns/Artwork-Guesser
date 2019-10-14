package com.ljxy.artguesser.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
    @OneToMany
    private List<Play> plays;

    /**
     * All the games created by the user.
     */
    @OneToMany
    private List<Game> createdGames;
}
