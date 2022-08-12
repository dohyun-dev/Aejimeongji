package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.condition.CalendarSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Calendar;
import com.ssafy.aejimeongji.domain.entity.Dog;
import com.ssafy.aejimeongji.domain.exception.CalendarNotFoundException;
import com.ssafy.aejimeongji.domain.exception.DogNotFoundException;
import com.ssafy.aejimeongji.domain.repository.CalendarRepository;
import com.ssafy.aejimeongji.domain.repository.DogRepository;
import com.ssafy.aejimeongji.domain.repository.MessagesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final DogRepository dogRepository;

    private final MessagesRepository messagesRepository;

    public Calendar findTodo(Long calendarId) {
        return calendarRepository.findById(calendarId).orElseThrow(() -> new CalendarNotFoundException(calendarId.toString()));
    }

    public List<Calendar> findCalendars(Long dogId, CalendarSearchCondition condition) {
        return calendarRepository.getCalendar(dogId, condition);
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

//     Message
    @Transactional
    public String findMessage(Date birthday) {

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Calendar birth = java.util.Calendar.getInstance();
        birth.setTime(birthday);

        java.util.Calendar now = java.util.Calendar.getInstance();
        now.setTime(new Date());

        // 1차 접종
        birth.add(java.util.Calendar.MONTH, 7);
        if (now == birth) {
            return "";
        }

        // 2-1차 접종
        birth.add(java.util.Calendar.MONTH, 3);

        // 2-2차 접종
        birth.add(java.util.Calendar.MONTH, 3);

        // 2-3차 접종
        birth.add(java.util.Calendar.MONTH, 3);

        // 3차 접종


//        HashMap<String, String> inoculation = new HashMap<String, String>();
//        inoculation.put();
        return "";
    }
}
