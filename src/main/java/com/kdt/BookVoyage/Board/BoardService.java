package com.kdt.BookVoyage.Board;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;


    @Transactional
    public void create(BoardEntity boardEntity) {
        boardRepository.save(boardEntity);
    }

    public List<BoardEntity> findBoardList() {
        return boardRepository.findAll();
    }

    public BoardEntity findOne(Long id) {
        //id에 해당하는 board가 repository에 존재하지 않을 경우 NullPointerException이 발생하면
        //서버가 죽을 수 있기 때문에, 예외처리를 함께 작성
        return boardRepository.findById(id).orElseThrow(NullPointerException::new);

    }

    @Transactional
    public void update( Long id, String title, String category, String content) {

        //영속성 컨텍스트에 올림 -> 캐싱을 위한 DB 접근을 최소화 하기 위해서 사용함
        BoardEntity findBoard = boardRepository.findById(id).orElseThrow(NullPointerException::new);
        findBoard.setTitle(title);
        findBoard.setCategory(category);
        findBoard.setContent(content);

        boardRepository.updateBoard(id,title,category,content, LocalDateTime.now());
    }

    @Transactional
    public void delete(BoardEntity boardEntity) {
            boardRepository.delete(boardEntity);
    }


    @Transactional
    public BoardDTO increaseView(Long postId) {
        Optional<BoardEntity> boardOptional = boardRepository.findById(postId);
        if (boardOptional.isPresent()) {
            BoardEntity boardEntity = boardOptional.get();
            int currentViewCount = boardEntity.getView();
            boardEntity.setView(currentViewCount + 1);
            boardRepository.save(boardEntity);

            // Entity를 DTO로 변환하여 반환
            return BoardDTO.EntityToDto(boardEntity);
        } else {
            throw new NotFoundException("게시글을 찾을 수 없습니다.");
        }
    }

    //Page<T>을 타입으로 지정하면, 반드시 파라미터로 Pageable을 받는다
    @Transactional(readOnly = true)
    public Page<BoardEntity> boardList(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Transactional
    public List<BoardEntity> search(String keyword) {
        return boardRepository.findByTitleContaining(keyword);
    }

    public Page<BoardEntity> getBoardListByCategory(String category, Pageable pageable) {
        log.info("asfasfasfsafasfsafd====={}", category);
       return boardRepository.findByCategoryIgnoreCase(category, pageable);
    }

/*    @Transactional(readOnly = true)
    public Page<BoardEntity> boardListByCategory(String category, Pageable pageable) {

        return boardRepository.searchAllByCategoryIgnoreCase(category,pageable);
    }*/
}

/**
 Java에서 Optional은 값의 존재 여부를 나타내는 컨테이너 클래스입니다. Optional은 null 값이 될 수 있는 값을 감싸서 안전하게 처리할 수 있도록 도와줍니다.
 이를 통해 NullPointerException 등의 예외를 방지하고, 코드의 가독성을 높일 수 있습니다.

 위의 코드에서도 Optional<BoardEntity>를 사용한 이유는 boardRepository.findById(postId) 메서드로 데이터베이스에서 게시글을 조회하고,
 해당 아이디에 해당하는 게시글이 존재할 수도 있고 존재하지 않을 수도 있기 때문입니다. 즉, 조회한 결과가 null일 수 있기 때문에 Optional을 사용하여 그 상황을 다루기 위함입니다. */