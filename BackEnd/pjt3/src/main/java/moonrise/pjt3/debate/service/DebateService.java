package moonrise.pjt3.debate.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import moonrise.pjt3.commons.response.ResponseDto;
import moonrise.pjt3.debate.dto.DebateChatDto;
import moonrise.pjt3.debate.dto.DebateCreateDto;
import moonrise.pjt3.debate.dto.DebateListResponseDto;
import moonrise.pjt3.debate.dto.DebateReadResponseDto;
import moonrise.pjt3.debate.entity.Debate;
import moonrise.pjt3.debate.entity.DebateInfo;
import moonrise.pjt3.debate.entity.Message;
import moonrise.pjt3.debate.repository.DebateInfoRepository;
import moonrise.pjt3.debate.repository.DebateRepository;
import moonrise.pjt3.debate.repository.MessageRepository;
import moonrise.pjt3.member.entity.Member;
import moonrise.pjt3.member.repository.MemberRepository;
import moonrise.pjt3.movie.entity.Movie;
import moonrise.pjt3.movie.repository.MovieRepository;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Log4j2
public class DebateService {
    private final DebateInfoRepository debateInfoRepository;
    private final RedisTemplate redisTemplate;
    private final MovieRepository movieRepository;
    private final MemberRepository memberRepository;
    private final DebateRepository debateRepository;
    private final MessageRepository messageRepository;
    public void saveCacheChat(DebateChatDto debateChatDto){ //채팅 들어오면 캐시에 저장
        String key = "debateChat::"+debateChatDto.getDebateId();
        ListOperations<String, Object> chatOperations = redisTemplate.opsForList();
        String value = "";
        try { //
            ObjectMapper mapper = new ObjectMapper();
            value = mapper.writeValueAsString(debateChatDto);
            log.info(value);
        } catch(Exception e){
            log.error(e);
        }
        if(chatOperations.size(key) == 0){
            chatOperations.rightPush(key,value);
            redisTemplate.expire(key,12,TimeUnit.HOURS);
            log.info("키값 없어서 키 생성하면서 expire 설정");
        }
        else{
            chatOperations.rightPush(key,value);
        }
    }

    public void saveRdbChat(List<DebateChatDto> debateChatDtos, int groupNum){
        //주기적으로 캐시서버에 저장된 채팅내역 mysql 백업
        log.info(groupNum+"메시지 저장");
        for (DebateChatDto debateChatDto : debateChatDtos) {
            Debate debate = debateRepository.findById(debateChatDto.getDebateId()).get();
            Message message = Message.builder()
                    .content(debateChatDto.getContent())
                    .debate(debate)
                    .groupNum(groupNum)
                    .writer(debateChatDto.getWriter())
                    .build();
            messageRepository.save(message);
            log.info(message);
        }
    }
    public ResponseDto getRecentChat(Long debateId, int findCnt) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ResponseDto responseDto = new ResponseDto();
        Map<String,Object> result = new HashMap<>();
        if(findCnt == 0) { // 채팅방 입장할때라 캐시서버에 저장된 채팅 내역만 리턴
            String key = "debateChat::" + debateId;
            String debateChatDtos = redisTemplate.opsForList().range(key, 0, -1).toString();
            log.info(debateChatDtos + "오오오오파싱 됩니까?");
            List<DebateChatDto> dtos = Arrays.asList(mapper.readValue(debateChatDtos, DebateChatDto[].class));
            result.put("recentChats",dtos);
        }
        else{ //채팅방 입장 후 위로 스크롤 올리는 등 mysql저장된 채팅 내역 요청 시 리턴
            Integer maxGroupNum = messageRepository.findMaxGroupId(debateId);
            if(maxGroupNum < findCnt){
                responseDto.setMessage("더이상 채팅내역이 없습니다.");
                responseDto.setData(null);
                responseDto.setStatus_code(400);
                return responseDto;
            }
            //이값이랑 findCnt 이용해서 Groupnum으로 select
            List<DebateChatDto> dbChats = messageRepository.findBYGroupNumAndDebateId(debateId, maxGroupNum - findCnt + 1);
            result.put("recentChats",dbChats);
        }
        //responseDto 작성
        responseDto.setMessage("이전 채팅내역 리턴");
        responseDto.setData(result);
        responseDto.setStatus_code(200);

        return responseDto;
    }

    public boolean updateLivePeopleCnt(Long debateId) {
        String key = "debateLivePeopleCnt::"+debateId;
        //캐시에 값이 없으면 레포지토리에서 조회 있으면 값을 증가시킨다.
        ValueOperations valueOperations = redisTemplate.opsForValue();
        Debate debate = debateRepository.findById(debateId).get();
        int maxPpl = debate.getMaxppl();
        int debateLivePeople;
        if(valueOperations.get(key)==null){
            debateLivePeople = debateInfoRepository.findDebateLivePeople(debateId);
            valueOperations.set(
                    key,
                    String.valueOf(debateLivePeople),
                    20,
                    TimeUnit.MINUTES);
        }
        else debateLivePeople = (int) valueOperations.get(key);

        if(debateLivePeople == maxPpl) return false;
        else valueOperations.increment(key);

        return true;
    }
}