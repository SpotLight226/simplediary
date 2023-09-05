import { useContext } from "react";
import Diaryitem from "./Diaryitem";
// import 받아서 사용
import { DiaryStateContext } from "./App";

const DiaryList = () => {
  // Context 에서 value 를 받아온다
  const diaryList = useContext(DiaryStateContext);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다</h4>
      <div>
        {/* map 으로 각 요소를 뿌린다 
            각 요소는 it 으로 객체 접근
            고유한 키가 없다면, index 를 사용
            => 단, 수정, 삭제가 일어나면 오류 발생 !! */}
        {diaryList.map((it) => (
          // onRemove 를 사용할 수 있게 내려준다
          <Diaryitem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

// diaryList 가 내려오지 않았을 때 default
DiaryList.defaultProps = {
  diaryList: [], // 빈 배열로 기본 값 설정
};

export default DiaryList;
