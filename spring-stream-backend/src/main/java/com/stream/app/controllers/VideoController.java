package com.stream.app.controllers;


import com.stream.app.entities.Video;
import com.stream.app.playload.CustomMessage;
import com.stream.app.services.VideoService;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/videos")
public class VideoController {

    private VideoService videoService;

    @PostMapping()
    public ResponseEntity<?> create(@RequestParam("file")MultipartFile file ,
                                                @RequestParam("title") String title ,
                                                @RequestParam("description") String description)
    {

        Video video = new Video();

        video.setTitle(title);
        video.setDescription(description);
        video.setVideoId(UUID.randomUUID().toString());

        Video savedVideo = videoService.save(video,file);

        if(savedVideo!=null)
        {
            return ResponseEntity.status(HttpStatus.OK).body(video);
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CustomMessage.builder().message("Video not uploaded").success(false).build());
        }

    }



}
