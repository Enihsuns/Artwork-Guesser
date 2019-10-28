package com.ljxy.artguesser.service;

import com.ljxy.artguesser.model.User;

public interface UserService {

    User checkUser(String email, String password);
}
