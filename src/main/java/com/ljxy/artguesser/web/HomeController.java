package com.ljxy.artguesser.web;

import com.ljxy.artguesser.model.Game;
import com.ljxy.artguesser.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class HomeController {

    private final GameService gameService;

    @Autowired
    public HomeController(GameService gameService) {
        this.gameService = gameService;
    }

    @RequestMapping("/home/games")
    public Collection<Game> games() {
        return gameService.listGame();
    }
}
