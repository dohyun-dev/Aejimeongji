package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.ssafy.aejimeongji.domain.condition.CalendarSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Calendar;

import java.util.List;

public interface CalendarRepositoryCustom {
    List<Calendar> getCalendar(CalendarSearchCondition condition);
}
