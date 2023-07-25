package com.ssafy.aejimeongji.domain.walking.domain;

import com.ssafy.aejimeongji.domain.dog.domain.Dog;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "walkingdog")
public class WalkingDog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dog_id")
    private Dog dog;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "walking_id")
    private Walking walking;

    private double calories;

    public WalkingDog(Dog dog, Walking walking, double calories) {
        this.dog = dog;
        this.walking = walking;
        this.calories = calories;
    }
}
