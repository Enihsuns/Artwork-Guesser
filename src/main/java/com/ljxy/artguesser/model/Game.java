package com.ljxy.artguesser.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference
    private User createUser;

    /**
     * Artworks to be guessed in each round.
     */
    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JsonManagedReference
    private List<Artwork> artworks = new ArrayList<>();

    /**
     * Game plays that had been played by users.
     */
    @OneToMany(mappedBy = "game")
    @JsonManagedReference
    private List<Play> plays = new ArrayList<>();
}
