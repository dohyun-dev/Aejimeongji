package com.ssafy.aejimeongji.domain.calendar.domain.repository;

import com.ssafy.aejimeongji.domain.calendar.application.dto.CalendarSearchCondition;
import com.ssafy.aejimeongji.domain.calendar.domain.Calendar;

import java.util.List;

public interface CalendarRepositoryCustom {
    List<Calendar> getCalendar(CalendarSearchCondition condition);
}
