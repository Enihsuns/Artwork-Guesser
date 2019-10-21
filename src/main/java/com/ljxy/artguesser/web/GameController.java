package com.ljxy.artguesser.web;

import com.ljxy.artguesser.model.Game;
import com.ljxy.artguesser.model.Play;
import com.ljxy.artguesser.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.ljxy.artguesser.util.Constants.*;

@RestController
public class GameController {
    private final GameService gameService;

    private static final String PLAY_SESSION_KEY = "play";

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    /**
     * Start the game. This method will save a temporary Play model in the session.
     * @param body Should contain a request param "gameId" indicating the game id.
     * @param session The current http session.
     * @return If success, response with service code 0. Otherwise, response with a message and a code.
     */
    @RequestMapping(value = "/game/start", method = RequestMethod.POST)
    public Map<String, Object> startGame(@RequestBody Map<String, Object> body, HttpSession session) {
        Map<String, Object> result = new HashMap<>();

        // Check whether parameters are valid
        Object gameIdObj = body.getOrDefault("gameId", null);
        Long gameId;
        if(gameIdObj instanceof Integer) {
            gameId = ((Integer) gameIdObj).longValue();
        }
        else if(gameIdObj instanceof Long) {
            gameId = (Long) gameIdObj;
        }
        else {
            result.put(CODE_KEY, INVALID_PARAMS_CODE);
            result.put(MSG_KEY, INVALID_PARAMS_MSG);
            return result;
        }

        // Check whether gameId is valid and whether game contains any artwork.
        Game game = gameService.getGame(gameId);
        if(game == null || game.getArtworks().size() == 0) {
            result.put("code", DATABASE_SEARCH_FAILED_CODE);
            result.put("msg", DATABASE_SEARCH_FAILED_MSG);
            return result;
        }

        // Init a new Play instance and put into the session.
        Play play = new Play();
        play.setGame(game);
        // TODO: play.setUser();
        play.setCurRound(0);
        play.setStartTime(new Date());
        session.setAttribute(PLAY_SESSION_KEY, play);

        // Success.
        result.put(CODE_KEY, SUCCESS_CODE);
        return result;
    }

    /**
     * Get the artwork of the current round of the game.
     * @param session The current http session.
     * @return
     */
    @RequestMapping(value = "/game/artwork", method = RequestMethod.POST)
    public Map<String, Object> artwork(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        // Check whether the session contains a Play model.
        Object playObject = session.getAttribute(PLAY_SESSION_KEY);
        Play play;
        if(playObject instanceof Play) {
            play = (Play)playObject;
        }
        else {
            response.put(CODE_KEY, INVALID_PARAMS_CODE);
            response.put(MSG_KEY, INVALID_PARAMS_MSG);
            return response;
        }

        // Check whether complete all the rounds.
        if(play.getCurRound() == play.getGame().getArtworks().size()) {
            // TODO: complete all the rounds.
            return response;
        }

        // Return the current artwork.
        response.put(CODE_KEY, SUCCESS_CODE);

        Map<String, Object> data = new HashMap<>();
        data.put("artworkCoverUrl", play.getGame().getArtworks().get(play.getCurRound()).getCoverUrl());
        response.put(DATA_KEY, data);
        return response;
    }
}
