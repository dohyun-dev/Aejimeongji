package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.calendar.CalendarResponse;
import com.ssafy.aejimeongji.api.dto.calendar.CalendarRequest;
import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.api.dto.calendar.TodosResponse;
import com.ssafy.aejimeongji.domain.condition.CalendarSearchCondition;
import com.ssafy.aejimeongji.domain.service.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CalendarApiController {

    private final CalendarService calendarService;

    @GetMapping("/dog/{dogId}/calendar")
    public ResponseEntity<List<?>> getTodoList(@ModelAttribute CalendarSearchCondition condition) {
        log.info("{}번 강아지 프로필 캘린더 조회", condition.getDogId());
        if (condition.getIsActive().equals(true)) {
            List<TodosResponse> result = calendarService.findCalendars(condition).stream().map(c -> new TodosResponse(c)).collect(Collectors.toList());
        }
        List<CalendarResponse> result = calendarService.findCalendars(condition).stream().map(c -> new CalendarResponse(c)).collect(Collectors.toList());
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/dog/{dogId}/calendar")
    public ResponseEntity<ResponseDTO> saveCalendar(@PathVariable Long dogId, @RequestBody CalendarRequest request) {
        log.info("{}번 강아지 프로필 캘린더 저장", dogId);
        calendarService.saveCalender(dogId, request.toEntity());
        return ResponseEntity.ok(new ResponseDTO("등록이 완료되었습니다."));
    }

    @PutMapping("/calendar/{calendarId}")
    public ResponseEntity<ResponseDTO> updateTodo(@PathVariable Long calendarId, @RequestBody CalendarRequest request) {
        log.info("{}번 강아지 프로필 캘린더 수정", calendarId);
        calendarService.updateCalendar(calendarId, request.toEntity());
        return ResponseEntity.ok(new ResponseDTO("수정이 완료되었습니다."));
    }

    @DeleteMapping("/calendar/{calendarId}")
    public ResponseEntity<ResponseDTO> deleteTodo(@PathVariable Long calendarId) {
        calendarService.deleteCalendar(calendarId);
        return ResponseEntity.ok(new ResponseDTO("삭제가 완료되었습니다."));
    }
}
