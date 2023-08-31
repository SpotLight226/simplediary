import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// 더미 리스트
// const dummyList = [
//   {
//     id: 1,
//     author: "장성욱",
//     content: "하이 1",
//     emotion: 1,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "홍길동",
//     content: "하이 2",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: "인절미",
//     content: "하이 4",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  // 일기 데이터 이므로 [] 빈 배열
  const [data, setData] = useState([]);

  const dataId = useRef(0); // 특정한 수 만들기 : 0 부터 시작

  // 추가 함수
  // 데이터를 핸들링해서 setData를 호출
  const onCreate = (author, content, emotion) => {
    // 시간 객체
    const created_date = new Date().getTime();
    // 추가 데이터
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    // 원래 있던 data 를 주고 newItem을 추가
    // onCreate 에서 setData 를 호출
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);

    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      {/* props 로 내려준다 */}
      <DiaryList diaryList={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
