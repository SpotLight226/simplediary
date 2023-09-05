import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// 상태변화를 관리할 reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data; // action객체에서 data를 초기화
    }
    case "CREATE": {
      const created_date = new Date().getTime(); // ms
      // 새로운 데이터
      const newItem = {
        ...action.data, // 전달받은 데이터
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      // 전달된 targetId 와 일치하면 content 를 수정한다
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state; // 기본은 그대로
  }
};

// Context
// 다른 컴포넌트들이 사용할 수 있도록 export
// data만을 내려주는 Context
export const DiaryStateContext = React.createContext();

// 함수를 내려주는 Context
export const DiaryDispatchContext = React.createContext();

function App() {
  // useReducer
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0); // 특정한 수 만들기 : 0 부터 시작

  // API 호출하기
  // 비동기 함수
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 0 ~ 4 까지 난수에 + 1
        created_date: new Date().getTime(), // ms 로 생성
        id: dataId.current++,
      };
    });

    // dispatch에 타입, data 를 지정
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  // 추가 함수
  // 데이터를 핸들링해서 setData를 호출
  const onCreate = useCallback((author, content, emotion) => {
    //dispatch 호출
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });

    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  // 수정할 글 id 와 수정될 content
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  // Context 로 내려줄 함수를 하나로 묶는다
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  // emotion 을 분석
  // useMemo 를 호출하고 callback함수가 리턴하는 값을 최적화할 수 있도록 도와준다
  // useEffect 와 동일하게 [] 안에 있는 변수가 변화할 때만 수행된다
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    // data 를 공급
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          {/* Context에서 내려주므로 props 을 내려주지 않아도 OK*/}
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
