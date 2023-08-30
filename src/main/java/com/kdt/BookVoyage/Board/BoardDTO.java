package com.kdt.BookVoyage.Board;


import com.kdt.BookVoyage.Reply.ReplyDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;


@Data
@NoArgsConstructor
public class BoardDTO {

    private Long id;

    private String title;
    private String category;
    private String writer;
    private String content;
    private int view;
    private Timestamp createdTime;
    private Timestamp modifiedTime;
    private List<ReplyDTO.ReplyResponseDTO> replies;

    public static BoardDTO EntityToDto(BoardEntity boardEntity) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(boardEntity, BoardDTO.class);
    }

    public BoardDTO(BoardEntity boardEntity) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");


        this.id = boardEntity.getId();
        this.title = boardEntity.getTitle();
        this.category = boardEntity.getCategory();
        this.writer = boardEntity.getWriter();
        this.content = boardEntity.getContent();
        this.view = boardEntity.getView();
        this.createdTime = boardEntity.getTimeBaseEntity().getCreatedTime();
        this.modifiedTime = boardEntity.getTimeBaseEntity().getUpdatedTime();
        this.replies = boardEntity.getReplies().stream().map(ReplyDTO.ReplyResponseDTO::new).collect(Collectors.toList());
    }
}
