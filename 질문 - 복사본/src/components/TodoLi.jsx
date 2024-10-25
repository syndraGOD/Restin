/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";

export const TodoLiUpdate = (props) => {
  return (
    <div {...props}>
      <FaPen />
    </div>
  );
};
export const TodoLiRemove = (props) => {
  return (
    <div {...props}>
      <IoMdTrash
        css={css`
          margin: 0px 20px;
        `}
      />
    </div>
  );
};
const TodoLi = ({ data, set, children, setCheck }) => {
  // console.log(data);
  const [input, setInput] = useState(data.text);
  const [enable, setEnable] = useState(true);
  return (
    <li
      css={css`
        list-style-type: none;
        list-style: none;
        display: flex;
        border: ${data.complete ? "1px solid red" : "1px solid #000"};
        height: 40px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      `}
    >
      <div
        css={css`
          display: flex;
          margin: 0px 20px;
        `}
      >
        <input
          type="checkbox"
          checked={data.complete}
          onChange={setCheck}
        ></input>
        <input
          type="text"
          value={input}
          disabled={enable}
          onChange={(e) => {
            setInput(e.currentTarget.value);
            set(data.id, e.currentTarget.value);
          }}
          css={css`
            color: ${data.complete ? "red" : "#000"};
            text-decoration: ${data.complete ? "line-through" : "none"};
            border: ${enable ? "none" : "1px solid #000"};
          `}
        ></input>
      </div>
      <div className="df">
        <TodoLiUpdate
          onClick={() => {
            setEnable(!enable);
          }}
        ></TodoLiUpdate>
        {children}
      </div>
    </li>
  );
};

export default TodoLi;
