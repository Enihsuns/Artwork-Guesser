package com.ljxy.artguesser.service;

import com.ljxy.artguesser.dao.UserRepository;
import com.ljxy.artguesser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User checkUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
