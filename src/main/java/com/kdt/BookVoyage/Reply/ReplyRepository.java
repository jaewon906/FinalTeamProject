package com.kdt.BookVoyage.Reply;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Long> {

    List<ReplyEntity> findByBoardEntity_Id(Long boardId);

}
