package com.ljxy.artguesser.web;

import com.ljxy.artguesser.model.Game;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
public class HomeController {

    @RequestMapping("/home")
    public Collection<Game> home() {
        // TODO: only for testing the connection between backend & frontend.
        List<Game> gameList = new ArrayList<>();
        gameList.add(new Game(0, "Try me 1", "https://pic4.zhimg.com/80/v2-5b59a66778496948e13b429f17666be8_hd.jpg"));
        gameList.add(new Game(1, "Game 2", "https://pic2.zhimg.com/80/v2-f5a7d3fff4272ea3fc29122045f4b317_hd.jpg"));
        gameList.add(new Game(2, "GAME 3", "https://pic1.zhimg.com/80/15eeebc5e0606cb465cb5b01ab89062f_hd.jpg"));
        gameList.add(new Game(3, "Good Game 4", "https://pic2.zhimg.com/80/v2-33c8f6636e6d4d0125206938293265da_hd.jpg"));

        return gameList;
    }
}
