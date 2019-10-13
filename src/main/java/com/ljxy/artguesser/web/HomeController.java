package com.ljxy.artguesser.web;

import com.ljxy.artguesser.model.Game;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
public class HomeController {

    @RequestMapping("/home/games")
    public Collection<Game> games() {
        List<Game> games = new ArrayList<>();
        return games;
    }
}
