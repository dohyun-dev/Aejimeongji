package com.ssafy.aejimeongji.domain.entity.image;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DogImage extends Image {

    public DogImage(Image image) {
        super(image.getOriginFilename(), image.getStoreFilename());
    }

    public DogImage(String originFilename, String storeFilename) {
        super(originFilename, storeFilename);
    }
}
