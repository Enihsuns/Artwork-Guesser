package com.ljxy.artguesser.service;

import com.ljxy.artguesser.dao.GameRepository;
import com.ljxy.artguesser.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class GameServiceImpl implements GameService{

    private final GameRepository gameRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Transactional
    @Override
    public List<Game> listGame() {
        return gameRepository.findAll();
    }
}
