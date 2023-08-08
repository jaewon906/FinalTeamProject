package com.finalproject.Common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass // 부모 클래스로 사용할 때 붙힘
// 하위 클래스에서 매핑 정보를 상속 받는다.
@EntityListeners(AuditingEntityListener.class) // JPA가 엔티티의 변경 이벤트를 감지하고, 감시 정보(생성일, 수정일 등)를 자동으로 관리할 수 있게 됩니다.
@Embeddable
@Getter
@Setter
public class TimeBaseEntity {
    @CreationTimestamp // 해당 데이터를 테이블에 적용했을 때 시간을 자동으로 생성해준다
    @Column(updatable = false) // 게시판 생성시에만 시간을 생성
    private LocalDateTime CreatedTime;

    @CreationTimestamp
    @Column(insertable = false) // 게시판 업데이트 시에만 데이터 수정
    private LocalDateTime UpdatedTime;
}
