package com.ljxy.artguesser.model;

public class Game {
    private final long id;
    private final String title;
    private final String coverUrl;

    public Game(long id, String title, String coverUrl) {
        this.id = id;
        this.title = title;
        this.coverUrl = coverUrl;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCoverUrl() {
        return coverUrl;
    }
}
