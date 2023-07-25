package com.ssafy.aejimeongji.domain.calendar.domain.repository;

import com.ssafy.aejimeongji.domain.calendar.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, Long>, CalendarRepositoryCustom {
}
