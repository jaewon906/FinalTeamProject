package com.kdt.BookVoyage.Reply;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Long> {

    List<ReplyEntity> findByBoardEntity_Id(Long boardId);

    @Query("DELETE FROM ReplyEntity R WHERE R.id = :replyId")
    @Modifying
    void deleteByReplyId(@Param("replyId") Long replyId);

}
