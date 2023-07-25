package com.ssafy.aejimeongji.domain.file.application.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.aejimeongji.domain.file.application.service.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class S3Utils implements FileUtils {

    private final AmazonS3 client;
    private final String bucketName;

    public S3Utils(
            AmazonS3 client,
            @Value("${cloud.aws.s3.bucket}") String bucketName
    ) {
        this.client = client;
        this.bucketName = bucketName;
    }

    @Override
    public String storeImage(MultipartFile multipartFile) throws IOException {

        String storeFilename = createStoreFilename(multipartFile.getOriginalFilename());
        ObjectMetadata metadata = makeMetadata(multipartFile);

        PutObjectRequest putObjectRequest = new PutObjectRequest(
                bucketName,
                storeFilename,
                multipartFile.getInputStream(),
                metadata
        );

        client.putObject(putObjectRequest);

        String storeFileUrl = client.getUrl(bucketName, storeFilename).toString();
        return storeFileUrl;
    }

    private ObjectMetadata makeMetadata(MultipartFile multipartFile) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(multipartFile.getContentType());
        metadata.setContentLength(multipartFile.getSize());
        return metadata;
    }

    @Override
    public void deleteFile(String storeFileUrl) {
        String filename = storeFileUrl.substring(storeFileUrl.lastIndexOf("/") + 1);
        if (!client.doesObjectExist(bucketName, filename))
            throw new IllegalStateException("해당 파일이 존재하지 않습니다.");
        client.deleteObject(new DeleteObjectRequest(bucketName, filename));
    }
}
