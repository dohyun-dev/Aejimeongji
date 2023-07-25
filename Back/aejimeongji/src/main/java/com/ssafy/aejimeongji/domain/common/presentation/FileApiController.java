package com.ssafy.aejimeongji.domain.common.presentation;

import com.ssafy.aejimeongji.domain.file.application.service.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class FileApiController {

    private final FileUtils fileUtil;

    @PostMapping("/file-upload")
    public ResponseEntity<String> fileUpload(@RequestPart("file") MultipartFile multipartFile) throws IOException {
        return ResponseEntity.ok(fileUtil.storeImage(multipartFile));
    }

    @DeleteMapping("/file-delete")
    public ResponseEntity<String> fileDelete(@RequestBody String fileUrl) {
        fileUtil.deleteFile(fileUrl);
        return ResponseEntity.ok().body("삭제 성공");
    }
}
