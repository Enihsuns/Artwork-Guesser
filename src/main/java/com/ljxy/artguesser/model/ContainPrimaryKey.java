package com.ljxy.artguesser.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class ContainPrimaryKey implements Serializable {

    private Long gId;
    private Integer round;

    ContainPrimaryKey() {
        gId = -1L;
        round = -1;
    }

    ContainPrimaryKey(Game game, Integer round) {
        this.gId = game.getId();
        this.round = round;
    }

    @Override
    public int hashCode() {
        final int PRIME = 31;
        int result = gId.hashCode();
        result = result*PRIME + round.hashCode();
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if(this.getClass() != obj.getClass()) {
            return false;
        }

        final ContainPrimaryKey other = (ContainPrimaryKey)obj;
        return gId.equals(other.gId) && round.equals(other.round);
    }
}
