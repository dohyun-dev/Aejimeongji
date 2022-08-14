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
import java.time.Period;
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

    @Transactional
    public void createInjectionInfo(Dog dog, LocalDate birthday) {

        LocalDate first = birthday.plusMonths(7);
        LocalDate secondOne = birthday.plusMonths(10);
        LocalDate secondTwo = birthday.plusMonths(13);
        LocalDate secondThree = birthday.plusMonths(16);

        LocalDate now = LocalDate.now();
        System.out.println("now = " + now);

        if (first.isAfter(now) || first.isEqual(now)) {
            calendarRepository.save(new Calendar(dog, "1차 접종", first));
            calendarRepository.save(new Calendar(dog, "2차 첫 번째 접종", secondOne));
            calendarRepository.save(new Calendar(dog, "2차 두 번째 접종", secondTwo));
            calendarRepository.save(new Calendar(dog, "2차 세 번째 접종", secondThree));
        } else if (secondOne.isAfter(now) || secondOne.isEqual(now)) {
            calendarRepository.save(new Calendar(dog, "2차 첫 번째 접종", secondOne));
            calendarRepository.save(new Calendar(dog, "2차 두 번째 접종", secondTwo));
            calendarRepository.save(new Calendar(dog, "2차 세 번째 접종", secondThree));
        } else if (secondTwo.isAfter(now) || secondTwo.isEqual(now)) {
            calendarRepository.save(new Calendar(dog, "2차 두 번째 접종", secondTwo));
            calendarRepository.save(new Calendar(dog, "2차 세 번째 접종", secondThree));
        } else if (secondThree.isAfter(now) || secondThree.isEqual(now)) {
            calendarRepository.save(new Calendar(dog, "2차 세 번째 접종", secondThree));
        }

        for (int i = 0; i < 120; i += 12) {
            if (birthday.plusMonths(28 + i).isAfter(now)) {
                calendarRepository.save(new Calendar(dog, "3차 접종", birthday.plusMonths(28 + i)));
            }
        }
    }

    // messages
    public String findMessages(LocalDate birthday) {

        LocalDate nowDate = LocalDate.now();
        Period diff = Period.between(birthday, nowDate);

        // 7 3 3 3 12
        if (diff.getMonths() == 0 && diff.getDays() == 0) {
            return "생일을 축하합니다!";
        }

        if (diff.getMonths() + diff.getYears() * 12 < 28 && (diff.getDays() == 1 || diff.getDays() == 0 || diff.getDays() == 30)) {

            if (checkDay(diff, 7)) {
                return "1차 예방접종 기간입니다!";
            } else if (checkDay(diff, 10)) {
                return "2차 첫 번째 예방접종 기간입니다!";
            } else if (checkDay(diff, 13)) {
                return "2차 두 번째 예방접종 기간입니다!";
            } else if (checkDay(diff, 16)) {
                return "2차 세 번째 예방접종 기간입니다!";
            } else if (checkYear(diff)) {
                return "3차 예방접종 기간입니다!";
            } else {
                List<Messages> messages = messagesRepository.findAll();
                Collections.shuffle(messages);
                return messages.get(0).getMessage();
            }

        } else if (checkYear(diff)) {
            return "3차 예방접종 기간입니다!";

        } else {
            List<Messages> messages = messagesRepository.findAll();
            Collections.shuffle(messages);
            return messages.get(0).getMessage();
        }
    }

    private boolean checkYear(Period diff) {
        return (diff.getMonths() + (diff.getYears() + 1) * 12 - 28) % 12 == 0 && (diff.getDays() == 1 || diff.getDays() == 0) ||
                ((diff.getMonths() + (diff.getYears() + 1) * 12 - 27) % 12 == 0 && diff.getDays() == 30);
    }

    private boolean checkDay(Period diff, int diffMonth) {
        return (diff.getMonths() + diff.getYears() * 12 == diffMonth && (diff.getDays() == 1 || diff.getDays() == 0)) ||
                (diff.getMonths() + diff.getYears() * 12 == diffMonth - 1 && diff.getDays() == 30);
    }
}
