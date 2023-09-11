package com.kdt.BookVoyage.Reply;


import com.kdt.BookVoyage.Board.BoardEntity;
import com.kdt.BookVoyage.Board.BoardRepository;
import com.kdt.BookVoyage.Board.NotFoundException;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    /**
     * 댓글 작성 api
     */
    @Transactional
    public ReplyDTO.ReplyResponseDTO replyCreate(Long id, ReplyDTO.ReplyRequestDTO dto) {
        // 게시글의 ID 값을 받기
        BoardEntity boardEntity = boardRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("댓글 작성 실패 : 해당 게시글이 존재하지 않습니다." + id));

        // 사용자 정보를 받기
        String logInUserNickname = dto.getNickname();
        // MemberEntity를 가져오는 로직 (예시: 닉네임을 이용하여 조회)
        MemberEntity memberEntity = memberRepository.findByNickname(logInUserNickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임의 사용자가 없습니다."));

        dto.setBoardEntity(boardEntity);
        dto.setMemberEntity(memberEntity);
        //memberEntity를 dto에 저장

        // 댓글 엔티티를 생성
        ReplyEntity replyEntity = dto.toEntity();
        // 댓글 엔티티에 사용자 정보를 저장
        replyEntity.setMemberEntity(memberEntity);
        // 댓글을 데이터베이스에 저장
        replyRepository.save(replyEntity);


        ReplyDTO.ReplyResponseDTO responseDTO = new ReplyDTO.ReplyResponseDTO(replyEntity);
        responseDTO.setNickname(logInUserNickname);
        log.info("작성될때 service code에서 id{}", id);

        return responseDTO;
    }

    @Transactional
    public void updataReply(Long replyId, String updatedText) {
        //댓글을 DB에서 업데이트 하도록 합니다
        ReplyEntity replyEntity = replyRepository.findById(replyId)
                .orElseThrow(() -> new EntityNotFoundException("댓글을 찾을 수 없습니다."));
        replyEntity.setReply(updatedText);
        replyRepository.save(replyEntity);
    }

    @Transactional
    public void deleteReply(Long replyId) {
        // 댓글을 데이터베이스에서 삭제
        replyRepository.deleteByReplyId(replyId);
        log.info("댓글 삭제 성공: {}", replyId);
    }


    public List<ReplyEntity> findReplyList(Long boardId) {
        return replyRepository.findByBoardEntity_Id(boardId);
    }

    /**
     * findAll 메서드를 사용하여 댓글을 조회하는 것도 가능하지만, findAll 메서드는 모든 댓글을 가져오기 때문에 해당 게시글에 속한 댓글만 가져와야 하는 상황에서는 사용하지 않는 것이 좋습니다.
     * 따라서 findByBoardEntity_Id를 사용하여 해당 게시글에 속한 댓글만 가져오는 것이 효율적입니다.
     * 이 방식은 필요한 데이터만을 선택적으로 가져오기 때문에 더 빠르고 효율적인 방법입니다.
     */

    @Transactional
    public ReplyEntity findOneReply(Long id) {
        //id에 해당하는 board가 repository에 존재하지 않을 경우 NullPointerException이 발생하면
        //서버가 죽을 수 있기 때문에, 예외처리를 함께 작성
        return replyRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    @Transactional
    public ReplyDTO.ReplyResponseDTO updateReply(Long replyId, ReplyDTO.ReplyRequestDTO dto) {

        ReplyEntity replyEntity = replyRepository.findById(replyId).orElseThrow(() -> new NotFoundException("댓글을 찾을 수 없습니다."));
        //댓글 수정할 내용을 업데이트
        replyEntity.setReply(dto.getReply());
        //DB에 수정되어 업데이트 된 댓글을 저장
        replyRepository.save(replyEntity);
        return new ReplyDTO.ReplyResponseDTO(replyEntity);
    }
}








