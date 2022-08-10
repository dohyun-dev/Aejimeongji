package com.ssafy.aejimeongji.domain.entity;

import com.ssafy.aejimeongji.domain.entity.image.DogImage;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "dog")
public class Dog extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double weight;

    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Boolean neutering;

    private Boolean gone;

    private LocalDate adoptionDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private DogImage image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "breed_id")
    private Breed breed;

    @Builder
    public Dog(String name, double weight, LocalDate birthday, Gender gender, Boolean neutering, Boolean gone, LocalDate adoptionDay, Member member, DogImage image, Breed breed) {
        this.name = name;
        this.weight = weight;
        this.birthday = birthday;
        this.gender = gender;
        this.neutering = neutering;
        this.gone = gone;
        this.adoptionDay = adoptionDay;
        this.member = member;
        this.image = image;
        this.breed = breed;
    }

    public void updateDog(String name, double weight, LocalDate birthday, LocalDate adoptionDay, Breed breed) {
        this.name = name;
        this.weight = weight;
        this.birthday = birthday;
        this.adoptionDay = adoptionDay;
        this.breed = breed;
    }

    public void changeDogProfileImage(DogImage dogImage) {
        this.image = dogImage;
    }
}
