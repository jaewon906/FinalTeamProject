package com.finalproject.Common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass // 부모 클래스로 사용할 때 붙힘
// 하위 클래스에서 매핑 정보를 상속 받는다.
@EntityListeners(AuditingEntityListener.class) // JPA가 엔티티의 변경 이벤트를 감지하고, 감시 정보(생성일, 수정일 등)를 자동으로 관리할 수 있게 됩니다.
@Embeddable // 예를 들어 멤버 테이블의 컬럼에 주소를 포함하고 싶음. 근데 주소 안에도 여러 멤버 변수들(상세주소 우편번호 등)을 포함시키고 싶을 때 즉, 한 덩어리로 묶어서 보내고 싶을 때
@Getter
@Setter
public class TimeBaseEntity {

    @CreatedDate // 해당 데이터를 테이블에 적용했을 때 시간을 자동으로 생성해준다
//  @CreationTimestamp 와 차이점 : @Creationtimestamp는 hibernate제공 / @CreateDate는 스프링 제공
//  hibernate 제공은 메인 메서드에 @EnableJPaAuditing, @EntityListener를 안붙혀도 되는데 요즘은 hibernate 어노테이션을 잘 안쓴다함.
    @Column(updatable = false) // 생성시에만 시간을 생성
    private LocalDateTime CreatedTime;

    @LastModifiedDate
    @Column(insertable = false) // 업데이트 시에만 시간 생성
    private LocalDateTime UpdatedTime;
}
