package com.ljxy.artguesser.service;

import com.ljxy.artguesser.dao.GameRepository;
import com.ljxy.artguesser.model.Artwork;
import com.ljxy.artguesser.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class GameServiceImpl implements GameService{

    private final GameRepository gameRepository;

    private final int MAX_ROUND_SCORE = 5000;
    private final int MAX_TIME_DIST = 2450;     // Music Instrument: -500 - 1950

    @Autowired
    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Transactional
    @Override
    public List<Game> listGame() {
        return gameRepository.findAll();
    }

    @Transactional
    @Override
    public Game getGame(Long id) {
        return gameRepository.findById(id).orElse(null);
    }

    @Override
    public int getScore(Artwork artwork, int guessTime) {
        if(guessTime >= artwork.getObjectBeginDate() && guessTime <= artwork.getObjectEndDate()) {
            return MAX_ROUND_SCORE;
        }

        int beginDist = Math.abs(guessTime - artwork.getObjectBeginDate());
        int endDist = Math.abs(guessTime - artwork.getObjectEndDate());
        return (int)((1.0 - (Math.min(beginDist, endDist) / (double)MAX_TIME_DIST))*MAX_ROUND_SCORE);
    }
}
