package com.ljxy.artguesser.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

/**
 * The Artwork data model.
 *
 * All our artwork data come from The Metropolitan Museum of Art API
 * (https://www.metmuseum.org/blogs/now-at-the-met/2018/met-collection-api). We select those
 * columns which could possibly be useful to our project as the member variable of our data model.
 */
@Data
@Entity
public class Artwork {

    /**
     * The object id of the artwork. We don't generate this id value. Instead, we use the
     * object id from the original csv.
     */
    @Id
    private Integer id;

    private String department;
    private String objectName;
    private String title;
    private String culture;
    private String period;
    private String dynasty;
    private String reign;
    private String portfolio;
    private String artistRole;
    private String artistPrefix;
    private String artistDisplayName;
    private String artistDisplayBio;
    private String artistSuffix;
    private String artistAlphaSort;
    private String artistNationality;
    private String artistBeginDate;
    private String artistEndDate;
    private String objectDate;
    private Integer objectBeginDate;
    private Integer objectEndDate;
    private String medium;
    private String dimensions;
    private String creditLine;
    private String geographyType;
    private String city;
    private String state;
    private String county;
    private String country;
    private String region;
    private String subregion;
    private String locale;
    private String locus;
    private String excavation;
    private String river;
    private String classification;
    private String linkResource;
    private String metadataDate;
    private String repository;
    private String tags;
    private String coverUrl;

    /**
     * Games which contain this artwork.
     */
    @ManyToMany(mappedBy = "artworks", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Game> games = new HashSet<>();
}
