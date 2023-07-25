package com.ssafy.aejimeongji.domain.dog.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "breed")
public class Breed {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String breedName;

    public Breed(String breedName) {
        this.breedName = breedName;
    }
}
