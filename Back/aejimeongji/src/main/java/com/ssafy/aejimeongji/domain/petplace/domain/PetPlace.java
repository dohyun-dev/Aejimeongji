package com.ssafy.aejimeongji.domain.petplace.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.aejimeongji.domain.file.PetplaceImageSet;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "petplace")
public class PetPlace {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String address;
    private String tel;
    private String category;
    private String detail;
    private Double rating;
    @JsonBackReference
    private Point point;
    private String homePage;
    private String openingHours;
    private int bookmarkCount = 0;

    @Embedded
    private PetplaceImageSet petplaceImageSet;

    public PetPlace(String name, String description, String address, String tel, String category, Point point, String openingHours, String detail, Double rating, String homePage) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.tel = tel;
        this.category = category;
        this.point = point;
        this.openingHours = openingHours;
        this.detail = detail;
        this.rating = rating;
        this.homePage = homePage;
    }

    @Builder
    public PetPlace(String name, String description, String address, String tel, String category, String detail, Double rating, Point point, String homePage, String openingHours, PetplaceImageSet petplaceImageSet) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.tel = tel;
        this.category = category;
        this.detail = detail;
        this.rating = rating;
        this.point = point;
        this.homePage = homePage;
        this.openingHours = openingHours;
        this.petplaceImageSet = petplaceImageSet;
    }
}