package com.kdt.BookVoyage.Board;




import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@SpringBootTest
public class BoardServiceTest {

    @Autowired
    BoardService boardService;

    @Autowired
    BoardRepository boardRepository;
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void writeBoard() {

        IntStream.rangeClosed(1,3).forEach(i -> {

            BoardEntity boardEntity = BoardEntity.builder()
                    .category("도서 예약")
                    .title("예약 부탁드려요..." + i)
                    .content("너무 빌리고 싶은 책이 있어요..." + i)
                    .writer("샘플 작성자..." + i)
                    .build();
            boardRepository.save(boardEntity);
        });

    }
        @Test
        public void testMemberRegistration() {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setUsername("홍길동");
            memberDTO.setNickname("푸바오");

            MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
            Long memberId = memberRepository.save(memberEntity).getId();
            // When
        }
        
    @Test
    @DisplayName("게시글 리스트 조회해보기")
    public void makeBoardList() {

        List<BoardEntity> boardList = boardService.findBoardList();
        boardList.stream().map(b -> boardList).collect(Collectors.toList());

    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("게시글 하나 조회하기")
    void testFindOne() {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setTitle("Test Title");
        boardEntity.setCategory("Test Category");
        boardEntity.setContent("Test Content");
        boardEntity.setWriter("작성자1");
        boardService.create(boardEntity);

        Long boardId = boardEntity.getId();

        BoardEntity findboard = boardService.findOne(boardId);

    }


    @Test
    @Transactional
    @Rollback
    void testUpdate() {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setTitle("Test Title");
        boardEntity.setCategory("Test Category");
        boardEntity.setContent("Test Content");
        boardEntity.setWriter("작성자5");
        boardService.create(boardEntity);

        Long boardId = boardEntity.getId();

        boardService.update(boardId, "Updated Title", "Updated Category", "Updated Content");

        BoardEntity updatedBoard = boardService.findOne(boardId);

        // TODO: assert statements to verify the result
    }

    @Test
    @Transactional
    @Rollback
    void testDelete() {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setTitle("Test Title");
        boardEntity.setCategory("Test Category");
        boardEntity.setContent("Test Content");
        boardEntity.setWriter("작성자2");

        boardService.create(boardEntity);

        Long boardId = boardEntity.getId();

        boardService.delete(boardEntity);

    }

    @Test
    @Transactional
    @Rollback
    void testIncreaseView() {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setTitle("Test Title");
        boardEntity.setCategory("Test Category");
        boardEntity.setContent("Test Content");
        boardEntity.setWriter("작성자3");

        boardService.create(boardEntity);

        Long boardId = boardEntity.getId();

        BoardDTO increasedBoard = boardService.increaseView(boardId);

        // TODO: assert statements to verify the result
    }

}
