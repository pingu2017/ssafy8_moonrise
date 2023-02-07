package moonrise.pjt1.party.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import moonrise.pjt1.member.entity.Member;
import moonrise.pjt1.movie.entity.Movie;
import moonrise.pjt1.party.entity.PartyComment;
import moonrise.pjt1.party.entity.PartyJoin;
import moonrise.pjt1.party.entity.PartyStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PartyReadResponseDto {
    private Long partyId;
    private String title;
    private String content;
    private LocalDateTime partyDate;
    private LocalDateTime deadLine;
    private int partyPeople;
    private String location;
    private PartyStatus partyStatus;
    private int viewCnt;
    private int likeCnt;
    private int commentCnt;
    private Long movie_id;
    private List<PartyJoin> partyJoins = new ArrayList<>();
    private List<PartyComment> partyComments = new ArrayList<>();

    public PartyReadResponseDto(Long partyId, String title, String content, LocalDateTime partyDate, int partyPeople,
                                String location, PartyStatus partyStatus,Long movie_id,
                                List<PartyJoin> partyJoins, List<PartyComment> partyComments,
                                LocalDateTime deadLine, int viewCnt, int likeCnt, int commentCnt) {
        this.partyId = partyId;
        this.title = title;
        this.content = content;
        this.partyDate = partyDate;
        this.partyPeople = partyPeople;
        this.location = location;
        this.partyStatus = partyStatus;
        this.movie_id = movie_id;
        this.partyJoins = partyJoins;
        this.partyComments = partyComments;
        this.deadLine = deadLine;
        this.viewCnt = viewCnt;
        this.likeCnt = likeCnt;
        this.commentCnt = commentCnt;
    }
}