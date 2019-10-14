package com.ljxy.artguesser.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Game {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String description;
    private String coverUrl;

    /**
     * The user who create this game.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    private User createUser;

    /**
     * Artworks to be guessed in each round.
     */
    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    private List<Artwork> artworks;

    /**
     * Game plays that had been played by users.
     */
    @OneToMany(mappedBy = "game")
    private List<Play> plays;

    /**
     * Init.
     */
    public Game() {
        artworks = new ArrayList<>();
    }
}
