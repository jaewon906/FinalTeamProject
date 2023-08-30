package com.kdt.BookVoyage.Board;


import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@MappedSuperclass //해당 어노테이션이 붙은 엔티티가 테이블로 생성되지 않도록 해주는 어노테이션
@EntityListeners(value = {AuditingEntityListener.class})
//AuditingEntityListener.class : JPA 내부에서 엔티티 객체가 생성/변경 되는 것을 감지하는 역할
public class BaseEntity {

    @CreatedDate //Board 게시글 등록 시간 설정
    @Column(name = "regDate" ,updatable = false) //updatable = false로 설정하여 객체를 DB에 반영할 때, 해당 컬럼 값은 변경 X
    private String regDate;

    @LastModifiedDate //게시글의 마지막 수정 시간을 자동으로 설정
    @Column(name = "modDate")
    private String modDate;

    /* 해당 엔티티를 저장하기 이전에 실행 */
    @PrePersist
    public void onPrePersist(){
        this.regDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        this.modDate = this.regDate;
    }

    /* 해당 엔티티를 업데이트 하기 이전에 실행*/
    @PreUpdate
    public void onPreUpdate(){
        this.modDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
    }
}
