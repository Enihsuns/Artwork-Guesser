package com.ljxy.artguesser.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Play {

    @Id
    @GeneratedValue
    private Long id;

    /**
     * Start time and end time of the play.
     */
    @Setter(AccessLevel.PRIVATE)
    private Date startTime, endTime;

    /**
     * Score and full score of the play.
     */
    @Getter(AccessLevel.PRIVATE)
    @Setter(AccessLevel.PRIVATE)
    private Double score, fullScore;

    /**
     * Current round of the play.
     */
    @Setter(AccessLevel.PRIVATE)
    private int curRound;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User user;

    /**
     * Constructor.
     */
    public Play() {
        curRound = 0;
        score = fullScore = 0d;
        startTime = new Date();
    }

    /**
     * Get the current round's artwork. Use this get method for convenience.
     * @return Current round's artwork.
     */
    public Artwork getCurRoundArtwork() {
        return game.getArtworks().get(curRound);
    }

    /**
     * After player played one round, call this method to update the Play data model.
     * @param roundScore The current round's score.
     * @param roundFullScore The current round's full score.
     */
    public void setNewRound(double roundScore, double roundFullScore) {
        curRound++;
        score += roundScore;
        fullScore += roundFullScore;
    }
}
