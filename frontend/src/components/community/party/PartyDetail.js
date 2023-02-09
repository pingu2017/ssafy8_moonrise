import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import PartyCandidate from './PartyCandidate'
import PartyComment from './PartyComment'
import PartyDetailCard from './PartyDetailCard'
import PartyEnroll from './PartyEnroll'

function PartyDetail() {
  const access_token = useSelector(state => state.member.accessToken);
  const [partyDetail, setPartyDetail] = useState({});
  const [partyComments, setPartyComments] = useState([]);
  const [isCommentChange, setIsCommentChange] = useState(true);
  const [partyJoinWait, setPartyJoinWait] = useState([])
  const [partyJoinAccept, setPartyJoinAccept] = useState([])
  const [isWriter, setIsWriter] = useState();
  const [joinStatus, setJoinStatus] = useState();
  const partyId = useParams().partyId;
  const movePage = useNavigate();
  function goBefore(){
    movePage('/community/list/party');
  }
  useEffect(() => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const config = { 
      headers: {
        "access_token": access_token,
      }
    }
    axios.get(baseURL+ '/api/party/read/'+partyId, config)
        .then(response => {
          console.log(response.data)
          setPartyDetail(response.data.data.findParty);
          setPartyComments(response.data.data.findParty.partyComments);
          setIsWriter(response.data.data.isWriter);
          setJoinStatus(response.data.data.joinStatus);
          setPartyJoinWait(response.data.data.findParty.partyJoinWait);
          setPartyJoinAccept(response.data.data.findParty.partyJoinAccept);
        });
    return () => {
    }
    }, [access_token, partyId, isWriter, isCommentChange])
  
  return (
    <div className='grid grid-cols-2 gap-4 py-10 PartyDetail mx-60'>
      <div className="col-span-1">
        <button className='text-white' onClick={goBefore}> &lt; 이전으로 </button>
        <p className='mt-4 text-orange-600 movieName'>{useSelector(state => state.movie.movieTitle)}</p>
        <p className="text-2xl text-white partyTitle">{partyDetail.title}</p>
        <PartyDetailCard partyDetail={partyDetail}/>
        <PartyCandidate partyJoins={partyJoinAccept} type={"승인"} setIsCommentChange={setIsCommentChange} isCommentChange={isCommentChange}/>
      </div>
      <div className="col-span-1">
        <PartyComment setIsCommentChange={setIsCommentChange} isCommentChange={isCommentChange} partyComments={partyComments} partyId={partyId}/>
        {!isWriter && (<PartyEnroll partyId={partyId} joinStatus={joinStatus} setIsCommentChange={setIsCommentChange} isCommentChange={isCommentChange}/>)}
        {isWriter && (<PartyCandidate partyJoins={partyJoinWait} type={"승인대기"} setIsCommentChange={setIsCommentChange} isCommentChange={isCommentChange}/>)}
      </div>
    </div>
  )
}

export default PartyDetail
