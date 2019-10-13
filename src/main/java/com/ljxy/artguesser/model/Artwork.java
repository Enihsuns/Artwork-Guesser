package com.ljxy.artguesser.model;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Artwork {

    @Id
    @GeneratedValue
    private Long id;

    private String coverUrl;

    private Integer beginYear;

    private Integer endYear;
}
