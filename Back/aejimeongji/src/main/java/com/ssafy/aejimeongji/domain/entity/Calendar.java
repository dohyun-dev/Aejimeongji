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

    public void setDog(Dog dog) {
        this.dog = dog;
    }
}
