package com.ljxy.artguesser.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.Date;

@Data
@Entity
public class Play {

    @Id
    @GeneratedValue
    private Long id;

    private Date time;
    private Integer score;

    @OneToOne
    private Game game;

    @OneToOne
    private User user;
}
