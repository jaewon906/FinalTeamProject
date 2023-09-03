package com.kdt.BookVoyage.Reply;


import com.kdt.BookVoyage.Board.BoardEntity;
import com.kdt.BookVoyage.Board.BoardRepository;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    /** 댓글 작성 api */
    @Transactional
    public ReplyDTO.ReplyResponseDTO replyCreate(Long id, ReplyDTO.ReplyRequestDTO dto, String logInUserNickname) {
        BoardEntity boardEntity = boardRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("댓글 작성 실패 : 해당 게시글이 존재하지 않습니다." + id));

        // MemberEntity를 가져오는 로직 (예시: 닉네임을 이용하여 조회)
        MemberEntity memberEntity = memberRepository.findByNickname(logInUserNickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임의 사용자가 없습니다."));

        dto.setBoardEntity(boardEntity);
        dto.setMemberEntity(memberEntity);
        //memberEntity를 dto에 저장


        ReplyEntity replyEntity = dto.toEntity();
        replyEntity.setMemberEntity(memberEntity); // Set the MemberEntity


        replyRepository.save(replyEntity);


        ReplyDTO.ReplyResponseDTO responseDTO = new ReplyDTO.ReplyResponseDTO(replyEntity);
        responseDTO.setNickname(logInUserNickname); // Set the nickname in the response DTO

        return responseDTO;
    }

    // 댓글 삭제 API
    @Transactional
    public void deleteReply(Long id, String logInUserNickname) {
        ReplyEntity replyEntity = replyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 댓글을 찾을 수 없습니다."));

        if (!replyEntity.getMemberEntity().getNickname().equals(logInUserNickname)) {
            throw new IllegalArgumentException("댓글 삭제 권한이 없습니다.");
        }

        replyRepository.delete(replyEntity);
    }


    public List<ReplyEntity> findReplyList(Long boardId) {
        return replyRepository.findByBoardEntity_Id(boardId);
    }
    /** findAll 메서드를 사용하여 댓글을 조회하는 것도 가능하지만, findAll 메서드는 모든 댓글을 가져오기 때문에 해당 게시글에 속한 댓글만 가져와야 하는 상황에서는 사용하지 않는 것이 좋습니다.
     *  따라서 findByBoardEntity_Id를 사용하여 해당 게시글에 속한 댓글만 가져오는 것이 효율적입니다.
     *  이 방식은 필요한 데이터만을 선택적으로 가져오기 때문에 더 빠르고 효율적인 방법입니다.
     *  */

    public ReplyEntity findOneReply(Long id) {
        //id에 해당하는 board가 repository에 존재하지 않을 경우 NullPointerException이 발생하면
        //서버가 죽을 수 있기 때문에, 예외처리를 함께 작성
        return replyRepository.findById(id).orElseThrow(NullPointerException::new);
    }

/*    @Transactional
    public void deleteReply(Long id) {
        try {
            replyRepository.findById(id).ifPresent(replyRepository::delete);
        } catch (Exception exception) {
            System.out.println("댓글 삭제 실패: " + exception);
            throw new RuntimeException("댓글 삭제 중 에러 발생");
        }
    }*/












/*    @Transactional
    public Long replyCreate(Long id, ReplyDTO.ReplyRequestDTO dto, String logInUserNickname) {
        BoardEntity boardEntity = boardRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("댓글 작성 실패 : 해당 게시글이 존재하지 않습니다." + id));

        // MemberEntity를 가져오는 로직 (예시: 닉네임을 이용하여 조회)
*//*        MemberEntity memberEntity = memberRepository.findByNickname(logInUserNickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임의 사용자가 없습니다."));*//*

        dto.setBoardEntity(boardEntity);

        ReplyEntity replyEntity = dto.toEntity();
        replyRepository.save(replyEntity);

        return replyEntity.getId();

    }*/




/*    @Transactional
    public Long replyCreate(Long id, ReplyDTO.ReplyRequestDTO dto) {
        BoardEntity boardEntity = boardRepository.findById(id).orElseThrow(() ->
            new IllegalArgumentException("댓글 작성 실패 : 해당 게시글이 존재하지 않습니다." + id));

            dto.setBoardEntity(boardEntity);

        ReplyEntity replyEntity = dto.toEntity();
        replyRepository.save(replyEntity);

        return replyEntity.getId();

        }*/



}

