package com.ljxy.artguesser.util;

import com.ljxy.artguesser.model.Artwork;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * A class which contains all the methods for calculating game scores.
 * TODO: Expecting diverse MAX_ROUND_SCORE for different artworks (possibly depends on whether they are famous).
 */
public class ScoreCalculator {

    private static final int MAX_ROUND_SCORE = 5000;
    private static final int MAX_TIME_DIST = 2450;     // Music Instrument: -500 - 1950

    /**
     * Get score of a round in time game play mode.
     * @param artwork The artwork to be guessed.
     * @param guessTime Guessed time.
     * @return A double indicating the score of the round.
     */
    public static double getScore(Artwork artwork, int guessTime) {
        if(guessTime >= artwork.getObjectBeginDate() && guessTime <= artwork.getObjectEndDate()) {
            return MAX_ROUND_SCORE;
        }

        int beginDist = Math.abs(guessTime - artwork.getObjectBeginDate());
        int endDist = Math.abs(guessTime - artwork.getObjectEndDate());
        return getFormattedDouble((1.0 - (Math.min(beginDist, endDist) / (double)MAX_TIME_DIST))*MAX_ROUND_SCORE);
    }

    /**
     * Get full score of a specific artwork.
     * @param artwork The queried artwork.
     * @return A double indicating the full score.
     */
    public static double getFullScore(Artwork artwork) {
        return MAX_ROUND_SCORE;
    }

    private static double getFormattedDouble(double value) {
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(1, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}
