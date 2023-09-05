import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const Diaryitem = ({ author, content, emotion, created_date, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  // 수정할 때 사용할 state ( 기본값 = false )
  const [isEdit, setIsEdit] = useState(false);

  // isEdit이 가지고 있던 값을 변경
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // 수정되는 값도 state로 관리한다
  // 수정 form에 사용될 state의 기본값을 원래 값으로 설정
  const [localContent, setLocalContent] = useState(content);

  // 수정 포커스를 위해 레퍼런스 객체
  const localContentInput = useRef();

  // 삭제 이벤트
  const handleRemove = () => {
    if (window.confirm(`${id}번 째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  // 수정 취소를 관리할 함수, 수정 취소를 누르면 다시 수정하기 눌렀을 때 원래 값으로 변경
  const handleQuitEdit = () => {
    setIsEdit(false); // isEdit을 false로
    setLocalContent(content); // 수정 값을 원래 값으로 변경
  };

  // 수정을 관리할 함수
  const handleEdit = () => {
    // 수정하기 전 길이 검사
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    // 수정 확인창
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      // 토글isEdit 실행해서 isEdit을 false 로 변경
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정 점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      {/* 수정하지 않을 때는 content가 렌더링, isEdit이 true라면 */}
      <div className="content">
        {isEdit ? (
          <>
            {/* 변경되는 값을 stae로 관리한다 */}
            <textarea
              // 값 관리위해서 ref 객체 전달
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {/* 수정 상태에 따라 버튼 관리 */}
      {isEdit ? (
        <>
          {/* 수정 취소 누르면 toggleIsEdit 으로 isEdit 을 false로 변경 */}
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(Diaryitem);
