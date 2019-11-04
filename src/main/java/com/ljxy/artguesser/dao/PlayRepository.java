package com.ljxy.artguesser.dao;

import com.ljxy.artguesser.model.Play;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayRepository extends JpaRepository<Play, Long> {
}
