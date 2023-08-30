package com.kdt.BookVoyage.Reply;


import com.kdt.BookVoyage.Security.TokenDecoder;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class ReplyController {

    private final TokenDecoder tokenDecoder;

    private final ReplyService replyService;

/*    @PostMapping("/board-detail/reply-list/{id}")
    public ResponseEntity<ReplyDTO.ReplyResponseDTO> replyCreate(@PathVariable Long id, @RequestBody ReplyDTO.ReplyRequestDTO dto, Principal principal) {

        Long replyId = replyService.replyCreate(id, dto);
        ReplyEntity createdReply = replyService.findOneReply(replyId);
        ReplyDTO.ReplyResponseDTO responseDTO = new ReplyDTO.ReplyResponseDTO(createdReply);

        return ResponseEntity.ok(responseDTO);
    }*/

    @PostMapping("/board-detail/reply-list/{id}")
    public ResponseEntity<ReplyDTO.ReplyResponseDTO> replyCreate(@PathVariable Long id, @RequestBody ReplyDTO.ReplyRequestDTO dto, HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();
        String accessToken = "";
        String nickname = "";
        for (Cookie cookie : cookies) {
            switch(cookie.getName()){
                case "accessToken" : accessToken = cookie.getValue();
            }
            nickname = tokenDecoder.accessTokenDecoder(accessToken, "nickname");
        }

        ReplyDTO.ReplyResponseDTO responseDTO = replyService.replyCreate(id, dto, nickname);

        return ResponseEntity.ok(responseDTO);

    }

//    @PostMapping("/board-detail/reply-list/{id}")
//    public ResponseEntity<ReplyDTO.ReplyResponseDTO> replyCreate(@PathVariable Long id, @RequestBody ReplyDTO.ReplyRequestDTO dto, Principal principal) {
//
//        String userNickname = principal.getName(); //// 현재 로그인한 사용자의 닉네임을 가져옴
//        Long replyId = replyService.replyCreate(id, dto, userNickname); // 닉네임 정보를 전달하여 댓글 생성
//
///*
//        ReplyEntity createdReply = replyService.findOneReply(replyId);
//*/
//        ReplyDTO.ReplyResponseDTO responseDTO = new ReplyDTO.ReplyResponseDTO(createdReply);
//
//        return ResponseEntity.ok(responseDTO);
//    }


    @GetMapping("/board-detail/reply-list/{id}")
    public ResponseEntity<List<ReplyDTO.ReplyResponseDTO>> reply_list(@PathVariable Long id) {

        List<ReplyEntity> replyList = replyService.findReplyList(id);

        List<ReplyDTO.ReplyResponseDTO> responseDTOList = replyList.stream()
                .map(reply -> {
                    ReplyDTO.ReplyResponseDTO responseDTO = new ReplyDTO.ReplyResponseDTO(reply);
                    // Null 체크 후 닉네임 설정

                    if (reply.getNickname() != null) {
                        responseDTO.setNickname(reply.getNickname());
                    } else {
                        responseDTO.setNickname("Unknown"); // 또는 원하는 다른 값으로 설정
                    }
                    return responseDTO;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDTOList);

    }

}

;