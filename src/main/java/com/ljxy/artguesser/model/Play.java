package com.ljxy.artguesser.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Play {

    @Id
    @GeneratedValue
    private Long id;

    private Date startTime;
    private Date endTime;
    private Integer score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User user;
}
