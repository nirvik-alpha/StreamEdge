package com.stream.app.services.impl;

import com.stream.app.entities.Video;
import com.stream.app.repositories.VideoRepository;
import com.stream.app.services.VideoService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.path;

@Service
public class VideoServiceImpl implements VideoService {

    @Value("${files.video}")
    String DIR;


    private VideoRepository videoRepository;

    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @PostConstruct
    public void init(){     // folder will automatically created when the object of the class will be created
        File file = new File(DIR);
        if(!file.exists()){
            file.mkdir();
            System.out.println("Folder created");
        }
        else{
            System.out.println("Folder already created");
        }
    }

    @Override
    public Video save(Video video, MultipartFile file) {

        // original file name

        try {

            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();
            InputStream inputStream = file.getInputStream();


            // file path
            String cleanFileName = StringUtils.cleanPath(fileName);

            // folder path
            String cleanFolder = StringUtils.cleanPath(DIR);

            // folder path with filename
            Path path =  Paths.get(cleanFolder,cleanFileName);

            System.out.println(path);

            // copy file to the folder

            Files.copy(inputStream,path, StandardCopyOption.REPLACE_EXISTING);

            // video meta data
            video.setContentType(contentType);
            video.setFilePath(path.toString());

            // meta data save to db
           return videoRepository.save(video);


        }catch (IOException e){
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public Video get(String videoId) {

        Video video = videoRepository.findById(videoId).orElseThrow(()-> new RuntimeException("Video not found"));
        return video;
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }

    @Override
    public List<Video> getAll() {
        return videoRepository.findAll();
    }
}
