package com.ljxy.artguesser.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Data
@Entity
@IdClass(ContainPrimaryKey.class)
public class Contain {
    @Id
    private Long gId;

    @Id
    private Integer round;

    private Long aId;
}
