package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.condition.CalendarSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Calendar;
import com.ssafy.aejimeongji.domain.entity.Dog;
import com.ssafy.aejimeongji.domain.exception.CalendarNotFoundException;
import com.ssafy.aejimeongji.domain.exception.DogNotFoundException;
import com.ssafy.aejimeongji.domain.repository.CalendarRepository;
import com.ssafy.aejimeongji.domain.repository.DogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final DogRepository dogRepository;

    public Calendar findTodo(Long calendarId) {
        return calendarRepository.findById(calendarId).orElseThrow(() -> new CalendarNotFoundException(calendarId.toString()));
    }

    public List<Calendar> findCalendars(CalendarSearchCondition condition) {
        return calendarRepository.getCalendar(condition);
    }

    @Transactional
    public Long saveCalender(Long dogId, Calendar calendar) {
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new DogNotFoundException(dogId.toString()));
        calendar.setDog(dog);
        return calendarRepository.save(calendar).getId();
    }

    @Transactional
    public Long updateCalendar(Long id, Calendar updateParam) {
        Calendar findCalendar = findTodo(id);
        findCalendar.updateCalendar(updateParam.getContent(), updateParam.getDate(), updateParam.getIsActive(), updateParam.getIsActive());
        return findCalendar.getId();
    }

    @Transactional
    public void deleteCalendar(Long id) {
        Calendar findCalendar = findTodo(id);
        calendarRepository.delete(findCalendar);
    }
}
