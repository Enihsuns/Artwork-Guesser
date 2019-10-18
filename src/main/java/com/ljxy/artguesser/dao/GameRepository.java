package com.ljxy.artguesser.dao;

import com.ljxy.artguesser.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

}
