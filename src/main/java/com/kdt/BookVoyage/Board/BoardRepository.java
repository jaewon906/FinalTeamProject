package com.kdt.BookVoyage.Board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {


    @Modifying
    @Query("update BoardEntity b set b.title = :title, b.category = :category, b.content = :content, b.timeBaseEntity.CreatedTime = :modifiedTime where b.id = :id")
    void updateBoard(@Param("id") Long id, @Param("title") String title, @Param("category") String category, @Param("content") String content, @Param("modifiedTime")LocalDateTime modifiedTime);


    Page<BoardEntity> findByCategoryIgnoreCase(String category, Pageable pageable);

    // 카테고리와 키워드로 검색
    Page<BoardEntity> findByCategoryAndTitleContaining(String category, String keyword, Pageable pageable);

    // 키워드로 검색
    Page<BoardEntity> findByTitleContaining(String keyword, Pageable pageable);


}
