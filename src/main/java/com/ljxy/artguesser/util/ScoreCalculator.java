package com.ljxy.artguesser.util;

import com.ljxy.artguesser.model.Artwork;

/**
 * A class which contains all the methods for calculating game scores.
 */
public class ScoreCalculator {

    private static final int MAX_ROUND_SCORE = 5000;
    private static final int MAX_TIME_DIST = 2450;     // Music Instrument: -500 - 1950

    /**
     * Get the score of a round in time game play mode.
     * @param artwork The artwork to be guessed.
     * @param guessTime Guessed time.
     * @return An integer indicating the score of the round.
     */
    public static int getScore(Artwork artwork, int guessTime) {
        if(guessTime >= artwork.getObjectBeginDate() && guessTime <= artwork.getObjectEndDate()) {
            return MAX_ROUND_SCORE;
        }

        int beginDist = Math.abs(guessTime - artwork.getObjectBeginDate());
        int endDist = Math.abs(guessTime - artwork.getObjectEndDate());
        return (int)((1.0 - (Math.min(beginDist, endDist) / (double)MAX_TIME_DIST))*MAX_ROUND_SCORE);
    }
}
