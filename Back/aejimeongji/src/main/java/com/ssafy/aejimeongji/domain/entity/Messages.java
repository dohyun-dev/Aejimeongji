package com.ssafy.aejimeongji.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="messages")
public class Messages {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

}
