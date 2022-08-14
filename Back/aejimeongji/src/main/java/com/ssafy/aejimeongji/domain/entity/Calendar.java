package com.ssafy.aejimeongji.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "calendar")
public class Calendar extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private LocalDate date;

    private Boolean isActive;

    private Boolean isAlert;

    private Boolean isInjection = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dog_id")
    private Dog dog;

    @Builder
    public Calendar(Dog dog, String content, LocalDate date, Boolean isActive, Boolean isAlert) {
        this.dog = dog;
        this.content = content;
        this.date = date;
        this.isActive = isActive;
        this.isAlert = isAlert;
    }

    public void updateCalendar(String content, LocalDate date, Boolean isActive, Boolean isAlert) {
        this.content = content;
        this.date = date;
        this.isActive = isActive;
        this.isAlert = isAlert;
    }

    public Calendar(Dog dog, String content, LocalDate date) {
        this.dog = dog;
        this.content = content;
        this.date = date;
        this.isActive = false;
        this.isAlert = false;
        this.isInjection = true;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }
}
