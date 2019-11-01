package com.ljxy.artguesser.web;

import com.ljxy.artguesser.model.User;
import com.ljxy.artguesser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

import static com.ljxy.artguesser.util.Constants.*;

@RestController
public class UserController {

    private final UserService userService;

    private static final String EMAIL_KEY = "email";
    private static final String PASSWORD_KEY = "password";

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map<String, Object> login(@RequestBody Map<String, Object> body, HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        // Get email and password parameters.
        String email = (String) body.getOrDefault(EMAIL_KEY, "");
        String password = (String) body.getOrDefault(PASSWORD_KEY, "");

        // Check if login succeed.
        User user = userService.checkUser(email, password);
        if(user == null) {
            response.put(CODE_KEY, INVALID_PARAMS_CODE);
            response.put(MSG_KEY, "Invalid email or password");
            return response;
        }

        // Put user in session.
        session.setAttribute(USER_KEY, user);

        // Success response.
        response.put(CODE_KEY, SUCCESS_CODE);
        return response;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public Map<String, Object> signup(@RequestBody Map<String, Object> body, HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        // Get email and password parameters.
        String email = (String) body.getOrDefault(EMAIL_KEY, "");
        String password = (String) body.getOrDefault(PASSWORD_KEY, "");

        // Save new user into database.
        User user = userService.saveUser(email, password);
        if(user == null) {
            response.put(CODE_KEY, INVALID_PARAMS_CODE);
            response.put(MSG_KEY, "Email already exist");
            return response;
        }

        // Login after signing up: save user model into session.
        session.setAttribute(USER_KEY, user);

        // Success response.
        response.put(CODE_KEY, 0);
        return response;
    }
}
