package com.ljxy.artguesser.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Data
@Entity
public class Game {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;
    private String coverUrl;

    @OneToOne
    private User createUser;
}