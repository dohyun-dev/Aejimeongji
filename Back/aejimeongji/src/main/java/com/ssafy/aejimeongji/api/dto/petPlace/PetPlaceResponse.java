package com.ssafy.aejimeongji.api.dto.petPlace;

import com.ssafy.aejimeongji.domain.entity.PetPlace;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.*;

@Data
@AllArgsConstructor
public class PetPlaceResponse {

    private Long id;
    private String name;
    private String description;
    private String address;
    private String tel;
    private String category;
    private String homePage;
    private String detail;
    private String openingHours;
    private Double distance;
    private Double rating;

    private List<String> petplaceImageUrl;
    private List<String> petplaceInfoUrl;
    private List<String> petplaceMenuUrl;
    private String petplaceThumbnail;

    public PetPlaceResponse(PetPlace petPlace, Double lat, Double lng) {
        id = petPlace.getId();
        name = petPlace.getName();
        description = petPlace.getDescription();
        address = petPlace.getAddress();
        tel = petPlace.getTel();
        category = petPlace.getCategory();
        detail = petPlace.getDetail();
        homePage = petPlace.getHomePage();
        rating = petPlace.getRating();
        openingHours = petPlace.getOpeningHours();
        distance = (6371 * acos(cos(toRadians(lat)) * cos(toRadians(petPlace.getPoint().getX())) * cos(toRadians(petPlace.getPoint().getY()) - toRadians(lng)) + sin(toRadians(lat)) * sin(toRadians(petPlace.getPoint().getX()))));
        petplaceImageUrl = getImageList(petPlace.getPetplaceImageSet().getPetplaceImage());
        petplaceInfoUrl = getImageList(petPlace.getPetplaceImageSet().getPetplaceInfo());
        petplaceInfoUrl = getImageList(petPlace.getPetplaceImageSet().getPetplaceMenu());
        petplaceThumbnail = petplaceImageUrl.get(0);
    }

    public PetPlaceResponse(PetPlace petPlace) {
        id = petPlace.getId();
        name = petPlace.getName();
        description = petPlace.getDescription();
        address = petPlace.getAddress();
        tel = petPlace.getTel();
        category = petPlace.getCategory();
        homePage = petPlace.getHomePage();
        detail = petPlace.getDetail();
        openingHours = petPlace.getOpeningHours();
        petplaceImageUrl = List.of(petPlace.getPetplaceImageSet().getPetplaceImage().split(","));
        petplaceInfoUrl = List.of(petPlace.getPetplaceImageSet().getPetplaceInfo().split(","));
        petplaceMenuUrl = List.of(petPlace.getPetplaceImageSet().getPetplaceMenu().split(","));
        petplaceThumbnail = petplaceImageUrl.get(0);
    }

    private List<String> getImageList(String image) {
        if (StringUtils.hasText(image)) {
            return List.of(image.split(","));
        } else {
            return new ArrayList<>();
        }
    }
}