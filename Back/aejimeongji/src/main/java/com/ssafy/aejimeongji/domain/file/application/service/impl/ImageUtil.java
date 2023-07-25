package com.ssafy.aejimeongji.domain.file.application.service.impl;

import com.ssafy.aejimeongji.domain.file.domain.Image;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class ImageUtil {

    private String fileDir = "/spring";

    public String getFullPath(String imageName) {
        return fileDir + imageName;
    }

    public List<Image> storeImages(List<MultipartFile> multipartFileList) throws IOException {
        List<Image> storeImages = new ArrayList<>();
        for (MultipartFile file : multipartFileList) {
            if(!file.isEmpty()) {
                storeImages.add(storeImage(file));
            }
        }
        return storeImages;
    }

    public Image storeImage(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty())
            return null;

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFilename = createStoreFilename(originalFilename);
        multipartFile.transferTo(new File(fileDir + storeFilename));

        return new Image(originalFilename, storeFilename);
    }

    public void deleteStoreImage(String storeFilename) {
        File file = new File(fileDir + storeFilename);

        if (file.exists()) {
            file.delete();
            log.info("{} 이미지를 삭제하였습니다.", storeFilename);
        } else {
            log.info("{} 이미지가 존재하지 않습니다.", storeFilename);
        }
    }

    private String createStoreFilename(String originalFilename) {
        return UUID.randomUUID().toString() + "." + extractExt(originalFilename);
    }

    private String extractExt(String originalFilename) {
        return originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
    }

}
