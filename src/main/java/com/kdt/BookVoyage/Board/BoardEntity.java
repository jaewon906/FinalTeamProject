package com.kdt.BookVoyage.Board;


import com.kdt.BookVoyage.Common.TimeBaseEntity;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Reply.ReplyEntity;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "BOARD")
@ToString(of = {"id, title"})
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "b_id")
    private Long id;

    @Column(name = "b_title", nullable = false)
    private String title;

    @Column(name = "b_category", nullable = false)
    private String category;

    @Column(name = "b_writer", nullable = false)
    private String writer;

    @Column(name = "b_content")
    private String content;

    @Column(columnDefinition = "integer default 0", nullable = false, name = "b_view")
    private int view;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private MemberEntity memberEntity;

    private Long replyCount;

    //게시글과 댓글 Entity간의 관계를 나타내주는 어노테이션
    //mappedBy 속성은 주인이 되는 쪽의 연관관계를 지정해주며, 여기서는 ReplyEntity 클래스와
    //매핑되어, BoardEntity의 boardEntity 필드를 사용하여 양방향 관계를 설정
    @OneToMany(mappedBy = "boardEntity", fetch = FetchType.EAGER, cascade = CascadeType.ALL,orphanRemoval = true)
    @OrderBy("id asc") //댓글 정렬 기능
    private List<ReplyEntity> replies = new ArrayList<>();


    @Embedded
    private TimeBaseEntity timeBaseEntity;

    public static BoardEntity DtoToEntity(BoardDTO boardDTO) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(boardDTO, BoardEntity.class);
    }

    public void setReplyCount(Long replyCount) {
        this.replyCount = replyCount;
    }

    public BoardEntity(Long id, String title, String category, String writer, String content, int view) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.writer = writer;
        this.content = content;
        this.view = view;
    }

}
