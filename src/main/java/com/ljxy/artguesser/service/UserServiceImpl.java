package com.ljxy.artguesser.service;

import com.ljxy.artguesser.dao.UserRepository;
import com.ljxy.artguesser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public User checkUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Transactional
    @Override
    public User saveUser(String email, String password) {
        if(userRepository.findByEmail(email) != null) {
            // Exist user.
            return null;
        }

        User user = new User(email, password);
        return userRepository.save(user);
    }
}
