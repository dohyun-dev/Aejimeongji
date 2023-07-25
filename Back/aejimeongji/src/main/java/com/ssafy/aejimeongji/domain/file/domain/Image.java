package com.ssafy.aejimeongji.domain.file.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Image {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originFilename;

    private String storeFilename;

    public Image(String originFilename, String storeFilename) {
        this.originFilename = originFilename;
        this.storeFilename = storeFilename;
    }
}
