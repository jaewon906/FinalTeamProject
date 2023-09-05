package com.kdt.BookVoyage.Board;


import com.kdt.BookVoyage.Member.MemberRepository;
import com.kdt.BookVoyage.Member.MemberService;
import com.kdt.BookVoyage.Reply.ReplyEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;



    @GetMapping("/board-list")
    public ResponseEntity<Page<BoardDTO>> board_list (
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size

    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<BoardEntity> boardPage = boardService.boardList(pageable);
        Page<BoardDTO> boardDTOPage = boardPage.map(BoardDTO::new);

        return ResponseEntity.ok(boardDTOPage);
    }

/*

    @GetMapping("/board-list/category")
    public ResponseEntity<Page<BoardDTO>> board_listCategory (
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category // 선택된 카테고리를 받음

    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<BoardEntity> boardPage = boardService.boardListByCategory(category, pageable);
        Page<BoardDTO> boardDTOPage = boardPage.map(BoardDTO::new);

        return ResponseEntity.ok(boardDTOPage);
    }


*/


    @GetMapping("/board-detail/{boardId}")
    public WrapperClass board_detail(@PathVariable("boardId") Long boardId) {

        BoardEntity boardEntity = boardService.findOne(boardId);
        boardService.increaseView(boardId); //조회수 증가하는 기능

        BoardDTO boardDTO = new BoardDTO(boardEntity);
        return new WrapperClass(boardDTO);

    }


    @PostMapping("/create-board")
    public ResponseEntity create_board(@RequestBody BoardDTO boardDTO ) {
        System.out.println("게시글 작성 요청 받음 = " + boardDTO);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED; //201 메세지로 잘 생성되었음을 확인

        try{

            BoardEntity boardEntity = new BoardEntity (
                    boardDTO.getId(),
                    boardDTO.getTitle(),
                    boardDTO.getCategory(),
                    boardDTO.getWriter(),
                    boardDTO.getContent(),
                    boardDTO.getView()
            );

            boardService.create(boardEntity);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "게시글 작성 완료");
            responseBody.put("timeBaseEntity", boardEntity.getTimeBaseEntity()); // 작성 시간 정보 추가

        }catch (Exception exception) {
            status = HttpStatus.BAD_REQUEST;  //404에러
            System.out.println("게시글 작성 예외 발생 : " + exception);
        }
        return new ResponseEntity<>(body, headers, status);
    }



    @PutMapping("/update-board")
    public ResponseEntity update_board(@RequestBody BoardDTO boardDTO) {
        System.out.println("게시글 수정 코드 DTO = " + boardDTO);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT;  //204 -> 수정이 정상적으로 완료
        try{
            boardService.update(boardDTO.getId(),
                    boardDTO.getTitle(),
                    boardDTO.getCategory(),
                    boardDTO.getContent());
                    LocalDateTime.now();
        } catch (Exception exception) {
            status = HttpStatus.BAD_REQUEST;  // 400에러 발생
            System.out.println("게시글 수정 에러 발생 = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }



    @DeleteMapping("/delete-board")
    public ResponseEntity delete_board(@RequestBody BoardDeleteDTO boardDeleteDTO) {
        System.out.println("게시글 삭제 컨트롤러 실행 DTO = " + boardDeleteDTO);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT;

        try {
            BoardEntity boardEntity = boardService.findOne(boardDeleteDTO.getId());
            boardService.delete(boardEntity);
        } catch (Exception exception) {
            status = HttpStatus.BAD_REQUEST;
            System.out.println("게시글 삭제 예외 발생 = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }



    @GetMapping("/board-list/search")
    public String search(String keyword, Model model) {
        try {
            List<BoardEntity> searchList = boardService.search(keyword);
            model.addAttribute("searchList", searchList);
        } catch (Exception exception) {
            System.out.println("검색이 안되요 = " + exception);
        }
        return null;
    }


    @GetMapping("/create-board/authenticate")
    public void createBoardAuthenticate() {
        log.info("성공");
    }

    @GetMapping("/update-board/authenticate")
    public void updateBoardAuthenticate() {
        log.info("============================= 수정 권한 메서드 ok =================================");
    }



}

/**
 * @RequestParam 어노테이션과 파라미터로 전달하는 값을 작성하는 이유는 다음과 같습니다:
 *
 * 페이징을 위한 파라미터 전달: 클라이언트가 특정 페이지의 데이터를 요청할 때, 페이지 번호와 페이지 크기를 파라미터로 전달하여 해당 페이지의 데이터를 가져올 수 있습니다.
 * 예를 들어, /board-list?page=2&size=10와 같이 요청하면 두 번째 페이지의 데이터를 10개씩 가져오게 됩니다.
 *
 * 기본값 설정: 파라미터 값이 전달되지 않을 경우 기본값을 설정해 줄 수 있습니다. 위 예시에서는 @RequestParam(defaultValue = "0")과 @RequestParam(defaultValue = "10")으로
 * 각각 페이지와 크기의 기본값을 0과 10으로 설정했습니다. 이는 클라이언트가 페이지와 크기를 명시적으로 지정하지 않았을 때, 기본적으로 0번째 페이지의 10개 데이터를 가져오도록 하기 위함입니다.
 *
 * 페이징 정보 활용: 컨트롤러에서 받은 페이지와 크기 정보를 사용하여 해당 페이지의 데이터를 서비스나 리포지토리로 전달하고, 페이징 처리된 결과를 클라이언트에 반환합니다.
 *
 * 따라서 @RequestParam 어노테이션과 파라미터로 전달하는 값을 설정하는 것은 클라이언트가 페이징된 데이터를 요청하고, 서버에서 그에 맞게 데이터를 처리하기 위한 필수적인 단계입니다.*/
