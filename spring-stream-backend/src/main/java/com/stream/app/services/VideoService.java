package com.stream.app.services;

import com.stream.app.entities.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {

    // save video

    Video save(Video video , MultipartFile file);  // [ all the metadata from the video object , file from multiPartFile ]

    // get video
    Video get(String videoId);


    // get video by title
    Video getByTitle(String title);

    List<Video> getAll();

}
