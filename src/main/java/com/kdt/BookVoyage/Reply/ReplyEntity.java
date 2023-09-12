package com.kdt.BookVoyage.Reply;


import com.kdt.BookVoyage.Board.BaseEntity;
import com.kdt.BookVoyage.Board.BoardEntity;
import com.kdt.BookVoyage.Member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "REPLY")
public class ReplyEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(columnDefinition = "TEXT")
    private String reply; // 댓글 내용

    @ManyToOne
    @JoinColumn(name = "b_id")
    private BoardEntity boardEntity;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private MemberEntity memberEntity;

}

