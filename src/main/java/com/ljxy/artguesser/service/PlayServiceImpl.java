package com.ljxy.artguesser.service;

import com.ljxy.artguesser.dao.PlayRepository;
import com.ljxy.artguesser.model.Play;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayServiceImpl implements PlayService {

    private final PlayRepository playRepository;

    @Autowired
    public PlayServiceImpl(PlayRepository playRepository) {
        this.playRepository = playRepository;
    }

    @Override
    public Play savePlay(Play play) {
        return playRepository.save(play);
    }
}
