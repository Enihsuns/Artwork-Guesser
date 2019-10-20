package com.ljxy.artguesser.web;

import com.ljxy.artguesser.model.Game;
import com.ljxy.artguesser.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class HomeController {

    private final GameService gameService;

    @Autowired
    public HomeController(GameService gameService) {
        this.gameService = gameService;
    }

    @RequestMapping("/home/games")
    public Map<String, Object> games() {
        Map<String, Object> result = new HashMap<>();

        List<Game> gameList = gameService.listGame();
        List<Object> resultGameList = new ArrayList<>();
        for(Game game: gameList) {
            Map<String, Object> resultGame = new HashMap<>();
            resultGame.put("id", game.getId());
            resultGame.put("title", game.getTitle());
            resultGame.put("description", game.getDescription());
            resultGame.put("coverUrl", game.getCoverUrl());

            resultGameList.add(resultGame);
        }

        result.put("data", resultGameList);
        return result;
    }
}
