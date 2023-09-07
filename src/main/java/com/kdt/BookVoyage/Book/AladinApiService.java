package com.kdt.BookVoyage.Book;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AladinApiService {

    private final BookRepository bookRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public AladinApiService(BookRepository bookRepository, RestTemplate restTemplate) {
        this.bookRepository = bookRepository;
        this.restTemplate = restTemplate;
    }

    public AladinBookDetailRes getDetails(AladinBookDetailReq aladinBookDetailReq) {
        String bookDetailUrl = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?";
        UriComponentsBuilder uri = UriComponentsBuilder.fromHttpUrl(bookDetailUrl)
                .queryParams(aladinBookDetailReq.toMultiValueMap());

        return restTemplate.getForObject(uri.toUriString(), AladinBookDetailRes.class);
    }

    public AdminBookSearchRes searchBookfromIsbn(AladinBookDetailReq aladinBookDetailReq) {
        String bookSearchUrl = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?";
        UriComponentsBuilder uri = UriComponentsBuilder.fromHttpUrl(bookSearchUrl)
                .queryParams(aladinBookDetailReq.toMultiValueMap());

        return restTemplate.getForObject(uri.toUriString(), AdminBookSearchRes.class);
    }

    public AladinItemListRes getBookList(AladinItemListReq aladinItemListReq) {
        String bookListUrl = "http://www.aladin.co.kr/ttb/api/ItemList.aspx?";
        UriComponentsBuilder uri = UriComponentsBuilder.fromHttpUrl(bookListUrl)
                .queryParams(aladinItemListReq.toMultiValueMap());

        return restTemplate.getForObject(uri.toUriString(), AladinItemListRes.class);
    }

    // 검색 api는 사용 안 함
    public AladinBookSearchRes searchItems(AladinBookSearchReq aladinBookSearchReq) {
        String bookSearchUrl = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?";
        UriComponents uri = UriComponentsBuilder.fromHttpUrl(bookSearchUrl)
                .queryParams(aladinBookSearchReq.toMultiValueMap())
                .build()
                .encode(StandardCharsets.UTF_8);


        System.out.println(uri.toUriString());
        return restTemplate.getForObject(uri.toUri(), AladinBookSearchRes.class);
    }

    // 검색했을 때 여러 도서 목록을 반환
    public List<BookEntity> searchBooks(String title) {
        return bookRepository.findBooksByTitleContaining(title);
    }

    // 도서 상세 정보 반환
    public BookEntity getBookDetails(String isbn13) {
        return bookRepository.findBookByIsbn13(isbn13);
    }

    // isbn을 기반으로 도서 검색한 후 나온 정보들을 BookEntity 및 DB에 저장하는 메서드
    public BookEntity saveBookFromDetailApi(AladinBookDetailReq aladinBookDetailReq) throws JsonProcessingException {

        // isbn을 기반으로 이미 저장된 도서를 검색
        String isbn = aladinBookDetailReq.getItemId();
        BookEntity existingBook = bookRepository.findBookByIsbn13(isbn);

        // 이미 저장된 도서가 있다면 중복 저장을 막음
        if(existingBook != null) {
            throw new DuplicateBookException("이미 저장된 도서입니다.");
        }

        BookEntity book = new BookEntity();

        AladinBookDetailRes aladinBookDetailRes = getDetails(aladinBookDetailReq);

        List<AladinBookDetailRes.BookDetails> bookDetails = aladinBookDetailRes.getItem();

        if(bookDetails != null && !bookDetails.isEmpty()) {
        for (AladinBookDetailRes.BookDetails bookDetail : bookDetails) {
            book.setTitle(bookDetail.getTitle());
            book.setAuthor(bookDetail.getAuthor());
            book.setPubDate(bookDetail.getPubDate());
            book.setPublisher(bookDetail.getPublisher());
            book.setFullDescription(bookDetail.getFullDescription());
            book.setFullDescription2(bookDetail.getFullDescription2());
            book.setCover(bookDetail.getCover());
            book.setIsbn13(bookDetail.getIsbn13());
            book.setPriceSales(bookDetail.getPriceSales());
            book.setPriceStandard(bookDetail.getPriceStandard());
            book.setCategoryName(bookDetail.getCategoryName());
            book.setToc(bookDetail.getSubInfo().getToc());
            book.setItemPage(bookDetail.getSubInfo().getItemPage());
            book.setRemain("1");

            // previewImgList 구성
            List<String> previewImgList = bookDetail.getSubInfo().getPreviewImgList();
            if(previewImgList != null && !previewImgList.isEmpty()) {
                ObjectMapper objectMapper = new ObjectMapper();
                String previewImgListToJSON = objectMapper.writeValueAsString(previewImgList);
                book.setPreviewImgList(previewImgListToJSON);
            }


            List<AladinBookDetailRes.Authors> bookAuthors = bookDetail.getSubInfo().getAuthors();

            if (bookAuthors != null && !bookAuthors.isEmpty()) {
                for (AladinBookDetailRes.Authors author : bookAuthors) {
                    book.setAuthorName(author.getAuthorName());
                    book.setAuthorTypeDesc(author.getAuthorTypeDesc());
                    book.setAuthorPhoto(author.getAuthorPhoto());
                    book.setAuthorInfo(author.getAuthorInfo());
                }
            }

        }
        }

        bookRepository.save(book);

        return book;
    }

    // url에 카테고리를 입력하면 그 카테고리 기준으로 도서 리스트 검색하여 BookListEntity 및 DB에 저장하는 메서드
//    public boolean saveBookListFromApi(String queryType) {
//
//        AladinItemListReq aladinItemListReq = new AladinItemListReq();
//        aladinItemListReq.setQueryType(queryType);
//        AladinItemListRes aladinItemListRes = getBookList(aladinItemListReq);
//
//        List<AladinItemListRes.BookListItem> bookLists = aladinItemListRes.getItem();
//
//        List<BookListEntity> bookTotalList = new ArrayList<>();
//
//        try {
//            for (AladinItemListRes.BookListItem bookListItem : bookLists) {
//
//                BookListEntity bookList = new BookListEntity();
//
//                bookList.setTitle(bookListItem.getTitle());
//                bookList.setAuthor(bookListItem.getAuthor());
//                bookList.setPublisher(bookListItem.getPublisher());
//                bookList.setPubDate(bookListItem.getPubDate());
//                bookList.setIsbn13(bookListItem.getIsbn13());
//
//                bookTotalList.add(bookList);
//            }
//            bookListRepository.saveAll(bookTotalList);
//
//            return true;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }

    // 페이징 처리하여 프론트엔드로 반환
    public List<BookEntity> getBooksByPage(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);    // 페이지 번호는 0부터 시작
        Page<BookEntity> bookPage = bookRepository.findAll(pageable);
        return bookPage.getContent();
    }

    // 프론트엔드에서 받은 bookId 값들로 책 조회하여 반환
    public List<BookDto> getBooksByIds(List<Long> ids) {
        List<BookEntity> bookEntities = bookRepository.findByBookIdIn(ids);

        return bookEntities.stream()
                .map(BookDto::entityToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public boolean deleteBookByIsbn(String isbn) {
        BookEntity book = bookRepository.findBookByIsbn13(isbn);

        if (book != null) {
            bookRepository.delete(book);
            return true;
        }
        return false;
    }
}
