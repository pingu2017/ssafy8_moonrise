package moonrise.pjt1.board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * 게시판 추가정보 - 좋아요 수, 댓글 수 등등..
 */
@Entity
@Table(name = "board_status")
@Getter
@Setter
@NoArgsConstructor
public class BoardInfo {
    @Id @GeneratedValue
    @Column(name = "board_info_id")
    private Long id;

    @OneToOne(mappedBy = "boardInfo", fetch = FetchType.LAZY)
    private Board board;
    @Enumerated(EnumType.STRING)
    private BoardStatus boardStatus;
    private int likeCnt;
    private int viewCnt;
    private int commentCnt;


}
