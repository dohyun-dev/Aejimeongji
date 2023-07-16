package com.ssafy.aejimeongji.domain.util;

import com.ssafy.aejimeongji.api.dto.FileDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

public interface FileUtil {

    FileDto storeImage(MultipartFile multipartFile) throws IOException;
    void deleteFile(String storeFileUrl);

    default String createStoreFilename(String originalFilename) {
        return UUID.randomUUID().toString() + "." + extractExt(originalFilename);
    }

    default String extractExt(String originalFilename) {
        return originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
    }
}
