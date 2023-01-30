import React from "react";
import BoardCard from "./BoardCard";

const DUMMY_DATA = [
  {
    board_id: 1,
    title: "크리스마스 쯤이면 생각나는 영화",
    content:
      "크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에서 늘 나오는 호그와트의 환상적인 저녁 만찬 장소는 허공을 떠다니는 촛불과 맛있는 음식 그리고 화려한 각 기숙사의 깃발들이 떠오르는데 그 모습들은 어딘가 크리마스를 떠오르게 한다. 조앤 롤링의 소설로 먼저 접했던 영화..  ",
    write_date: "2023.01.17 09:54",
    nickname: "홍길동",
    like_cnt: 34,
    comment_cnt: 14,
    poster:
    "https://images.ctfassets.net/usf1vwtuqyxm/6Meesa1ONupgjIy7JS5TvF/10fff5e089662ef26336c1e2b8414f70/minalima-weasley-family.jpg?w=315&h=315&fit=fill&f=top&fm=webp&q=70",
  },
  {
    board_id: 2,
    title: "크리스마스 쯤이면 생각나는 영화",
    content:
      "크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에서 늘 나오는 호그와트의 환상적인 저녁 만찬 장소는 허공을 떠다니는 촛불과 맛있는 음식 그리고 화려한 각 기숙사의 깃발들이 떠오르는데 그 모습들은 어딘가 크리마스를 떠오르게 한다. 조앤 롤링의 소설로 먼저 접했던 영화..  ",
    write_date: "2023.01.17 09:54",
    nickname: "홍길동",
    like_cnt: 34,
    comment_cnt: 14,
    poster:
    "https://images.ctfassets.net/usf1vwtuqyxm/5bqVQEImJpoPAciVRNQqFu/336875e94b38fac41c7c1bed3336dcf6/SHP---Hero-Mob.jpg?w=315&h=315&fit=fill&f=top&fm=webp&q=70",
  },
  {
    board_id: 3,
    title: "크리스마스 쯤이면 생각나는 영화",
    content:
      "크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에크리스마스 쯤이면 생각나는 영화들이 몇개 있는데 그 중 하나인 해리포터 시리즈, 해리포터 시리즈에서 늘 나오는 호그와트의 환상적인 저녁 만찬 장소는 허공을 떠다니는 촛불과 맛있는 음식 그리고 화려한 각 기숙사의 깃발들이 떠오르는데 그 모습들은 어딘가 크리마스를 떠오르게 한다. 조앤 롤링의 소설로 먼저 접했던 영화..  ",
    write_date: "2023.01.17 09:54",
    nickname: "홍길동",
    like_cnt: 34,
    comment_cnt: 14,
    poster:
    "https://images.ctfassets.net/usf1vwtuqyxm/5bqVQEImJpoPAciVRNQqFu/336875e94b38fac41c7c1bed3336dcf6/SHP---Hero-Mob.jpg?w=315&h=315&fit=fill&f=top&fm=webp&q=70",
  },
];

function BoardList() {
  const data = DUMMY_DATA;

  return (
    <div className="float-left w-4/5 bg-gray-600">
      <ul>
        {data.map((board) => (
          <BoardCard
            key={board.board_id}
            title={board.title}
            content={board.content}
            write_date={board.write_date}
            nickname={board.nickname}
            like_cnt={board.like_cnt}
            comment_cnt={board.comment_cnt}
            poster={board.poster}
          />
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
