package com.kdt.BookVoyage.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    Page<BookEntity> findAll(Pageable pageable);
    List<BookEntity> findBooksByTitleContaining(String title);

    BookEntity findBookByIsbn13(String isbn13);
}
