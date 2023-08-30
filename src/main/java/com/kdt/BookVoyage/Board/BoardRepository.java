package com.kdt.BookVoyage.Board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

    List<BoardEntity> findByTitleContaining(String keyword);

/*    @Query(value = "SELECT MAX(ID) FROM BoardEntity WHERE deleted = true", nativeQuery = true)
    Long findMaxDeleteId();

    @Modifying
    @Query(value = "ALTER TABLE board AUTO_INCREMENT = :startValue", nativeQuery = true)
    void setAutoIncrementStart(Long startValue);*/


    @Modifying
    @Query("update BoardEntity b set b.title = :title, b.category = :category, b.content = :content, b.timeBaseEntity.CreatedTime = :modifiedTime where b.id = :id")
    void updateBoard(@Param("id") Long id, @Param("title") String title, @Param("category") String category, @Param("content") String content, @Param("modifiedTime")LocalDateTime modifiedTime);



}
