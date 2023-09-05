import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  // DiaryDispatchContext 에서 onCreate를 가져온다
  // 이 때, onCreate 는 useMemo 로 묶여서 객체로 전달된다
  // => 비구조 할당으로 받는다
  const { onCreate } = useContext(DiaryDispatchContext);

  const authorInput = useRef();
  const contentInput = useRef();

  // 2. 하나의 state 로 묶기 !!
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  // event 함수 통합
  const handleChangeState = (event) => {
    setState({
      ...state,
      // state의 파라미터 명 == event.target.name
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    // 입력값 핸들링
    // input의 길이가 1보다 작다면 input 태그에 포커스
    if (state.author.length < 1) {
      // 현재 가르키는 값을 current 로 사용 가능
      // focus
      authorInput.current.focus();
      //focus                                                                                                                                                                                                                                                    ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ
      return;
    }
    // input 길이가 5보다 작다면 input 태그에 포커스
    if (state.content.length < 5) {
      contentInput.current.focus();
      // focus
      return;
    }

    // 저장이 성공한다면, props로 받은 onCreate에 각 값을 전달한다
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  // 1. input의 값을 핸들링할 수 있게 state 이용
  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          // input 태그에 접근할 수 있다
          ref={authorInput}
          // input 태그의 name
          name="author"
          value={state.author}
          // 값이 바뀌었을 때 수행하는 이벤트
          // 각 해당하는 값이 변경될 때만 state 객체에서 해당하는 변수의 값이 변경
          // state 는 객체이므로, 객체로 전달한다 !!
          onChange={handleChangeState}
        />
      </div>
      <div>
        {/* 사용법은 input 태그와 동일  value에 state, set함수에 event.target의 value*/}
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        {/* select 태그 다루기 */}
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
