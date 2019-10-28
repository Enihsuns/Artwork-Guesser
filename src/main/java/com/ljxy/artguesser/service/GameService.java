package com.ljxy.artguesser.service;

import com.ljxy.artguesser.model.Artwork;
import com.ljxy.artguesser.model.Game;

import java.util.List;

public interface GameService {

    List<Game> listGame();

    Game getGame(Long id);

    /**
     * Get the score of a round in time game play mode.
     * @param artwork The artwork to be guessed.
     * @param guessTime Guessed time.
     * @return An integer indicating the score of the round.
     */
    int getScore(Artwork artwork, int guessTime);
}
