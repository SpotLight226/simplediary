import React, { useEffect, useState } from "react";
// useEffect 실습

const UnMountTest = () => {
  useEffect(() => {
    console.log("Mount");

    return () => {
      // UnMount 시점에 실행된다
      console.log("UnMount");
    };
  }, []);

  return <div>UnMount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIstVisible] = useState(false);
  // isVisible 을 변경
  const toggle = () => setIstVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {/* 단락 회로 평가로 isVisible이 true 일 때만 UnMountTest가 보인다 */}
      {isVisible && <UnMountTest />}
    </div>
  );
};

export default Lifecycle;
