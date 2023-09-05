package com.kdt.BookVoyage.Reply;



import com.kdt.BookVoyage.Board.BoardEntity;
import com.kdt.BookVoyage.Member.MemberEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class
ReplyDTO {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ReplyRequestDTO {

        private Long id;
        private String nickname;
        private String reply;
        private String regDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
        private String modDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
        private BoardEntity boardEntity;
        private MemberEntity memberEntity; //memberEntity추가

        /* Dto -> Entity */
        public ReplyEntity toEntity() {
            ReplyEntity replyEntity = ReplyEntity.builder()
                    .id(id)
                    .reply(reply)
                    .nickname(nickname)
                    .boardEntity(boardEntity)
                    .memberEntity(memberEntity)
                    .build();

            return replyEntity;
        }
    }

    /**
     * 댓글 정보를 리턴할 응답(Response) 클래스
     * Entity 클래스를 생성자 파라미터로 받아 데이터를 Dto로 변환하여 응답
     * 별도의 전달 객체를 활용해 연관관계를 맺은 엔티티간의 무한참조를 방지
     */
    @RequiredArgsConstructor
    @Getter
    public static class ReplyResponseDTO {
        private Long id;
        private String reply;
        private String nickname;
        private String regDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
        private String modDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
        private Long boardId;


        /* Entity -> Dto*/
        public ReplyResponseDTO(ReplyEntity replyEntity) {
            this.id = replyEntity.getId();
            this.reply = replyEntity.getReply();
            this.regDate = replyEntity.getRegDate();
            this.modDate = replyEntity.getModDate();
            this.boardId = replyEntity.getBoardEntity().getId();

            if(replyEntity.getMemberEntity() != null) {
                this.nickname = replyEntity.getMemberEntity().getNickname();
            }
        }


        public void setNickname(String nickname) {
            this.nickname = nickname;
        }
    }

}
