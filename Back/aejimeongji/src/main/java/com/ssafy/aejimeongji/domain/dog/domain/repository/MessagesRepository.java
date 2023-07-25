package com.ssafy.aejimeongji.domain.dog.domain.repository;

import com.ssafy.aejimeongji.domain.guide.domain.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessagesRepository extends JpaRepository<Messages, Long> {
}
