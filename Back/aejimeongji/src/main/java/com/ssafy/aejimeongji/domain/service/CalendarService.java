package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.condition.CalendarSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Calendar;
import com.ssafy.aejimeongji.domain.entity.Dog;
import com.ssafy.aejimeongji.domain.entity.Messages;
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
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    // messages
    public String findMessages(LocalDate birthday) {

        Date b = java.sql.Date.valueOf(birthday);
        java.util.Calendar birth = java.util.Calendar.getInstance();
        birth.setTime(b);

        java.util.Calendar now = java.util.Calendar.getInstance();

        int diffMonth = (now.get(java.util.Calendar.YEAR) * 12 + now.get(java.util.Calendar.MONTH)) - (birth.get(java.util.Calendar.YEAR) * 12 + birth.get(java.util.Calendar.MONTH));
        int day = birth.get(java.util.Calendar.DATE);
        int nowDay = now.get(java.util.Calendar.DATE);


        // 7 3 3 3 12
        if (birth.get(java.util.Calendar.MONTH) == now.get(java.util.Calendar.MONTH) && day == nowDay) {
            return "생일을 축하합니다!";
        }

        if (diffMonth < 28 && (day <= nowDay) && (nowDay <= day + 3)) {

            if (diffMonth == 7) {
                return "1차 예방접종 기간입니다!";
            } else if (diffMonth == 10) {
                return "2차 첫 번째 예방접종 기간입니다!";
            } else if (diffMonth == 13) {
                return "2차 두 번째 예방접종 기간입니다!";
            } else if (diffMonth == 16) {
                return "2차 세 번째 예방접종 기간입니다!";
            } else {
                List<Messages> messages = messagesRepository.findAll();
                Collections.shuffle(messages);
                String result = messages.get(0).getMessage();
                return result;
            }

        } else if ((diffMonth - 28) % 12 == 0 && (day <= nowDay) && (nowDay <= day + 3)) {
            return "3차 예방접종 기간입니다!";

        } else {
            List<Messages> messages = messagesRepository.findAll();
            Collections.shuffle(messages);
            String result = messages.get(0).getMessage();
            return result;
        }
    }
}
