import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileSeeMoreButton from '../ProfileSeeMoreButton';
import ProfilePartyCard from './ProfilePartyCard';

function ProfilePartyHostList(props) {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(8);
  const [list, setList] = useState([]);

  const access_token = useSelector((state) => state.member.accessToken);

  useEffect(() => {
    const config = {
      headers: {
        access_token: access_token,
      },
    };
    axios
      .get("http://3.35.149.202:80/api/party/list/my", config)
      .then((response) => {
        console.log(response)
        setData(response.data.data.findParties);
      });
  }, [access_token]);

  useEffect(() => {
    if(data.length > 0) { 
      setList(data.filter((item, index) => index < limit));
    }
  }, [data, limit]);

  const seeMore = () => {
    setLimit(limit + 8);
    props.showTopButton();
  };

  return (
    <div className="p-2">
      <ul className="grid grid-cols-4 gap-4 justify-items-center">
        {list.map((party) => (
          <ProfilePartyCard
            moim_id={party.partyId}
            title={party.title}
            moim_date={party.partyDate}
            location={party.location}
            image={party.imagePath}
          />
        ))}
      </ul>
      {limit < data.length && <ProfileSeeMoreButton seeMore={seeMore} />}
    </div>
  )
}

export default ProfilePartyHostList
