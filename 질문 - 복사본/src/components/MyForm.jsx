/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TodoLi, { TodoLiRemove, TodoLiUpdate } from "./TodoLi";
import Button from "./Button";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/modules/mainSlice";
const MyForm = () => {
  const dispatch = useDispatch();
  const li = useSelector((state) => state.mainR.innerData);
  const setli = (props) => {
    dispatch(setData(props));
  };

  const input = useRef(null);
  // const { val, setval } = useState("");
  const [filter, setFilter] = useState("all");
  const [id, setId] = useState(0);
  const remove = (removeId) => {
    setli(li.filter((data) => data.id !== removeId));
  };
  const update = (updateId, value) => {
    setli(
      li.map((data) => (data.id === updateId ? { ...data, text: value } : data))
    );
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-content: center;
        width: 60vw;
        border: 1px solid #000;
        > div {
          border: 1px solid #000;
        }
        .df {
          display: flex;
          text-align: center;
          justify-content: center;
          align-content: center;
        }
      `}
    >
      <div>
        <h2>할일을 입력하세요</h2>
      </div>
      <div
        css={css`
          height: 50px;
          display: flex;
        `}
      >
        <input
          type="text"
          css={css`
            height: 90%;
            flex: 1;
          `}
          ref={input}
          placeholder="할일을 입력하세요."
        />
        <button
          css={css`
            width: 50px;
            height: 100%;
            font-size: 24px;
          `}
          onClick={() => {
            setli([...li, { id, text: input.current.value, complete: false }]);
            setId((id) => id + 1);
            input.current.value = "";
            input.current.focus();
          }}
        >
          +
        </button>
      </div>
      <div>
        <ul>
          {console.log(li)}
          {li
            .filter((data) => {
              if (filter === "all") return true;
              if (filter === "true") {
                if (data.complete) {
                  return true;
                }
              }
              if (filter === "false") {
                if (!data.complete) {
                  return true;
                }
              }
            })
            .map((data) => {
              return (
                <TodoLi
                  key={data.id}
                  data={data}
                  set={update}
                  setCheck={() => {
                    setli(
                      li.map((checked) =>
                        checked.id === data.id
                          ? { ...checked, complete: !checked.complete }
                          : checked
                      )
                    );
                  }}
                >
                  <TodoLiRemove
                    onClick={() => {
                      remove(data.id);
                    }}
                  ></TodoLiRemove>
                </TodoLi>
              );
            })}
        </ul>
      </div>
      <div
        css={css`
          button {
            padding: 10px;
            margin: 5px;
            color: white;
          }
        `}
      >
        <Button
          css={css`
            background-color: ${filter === "all" ? "red" : "black"};
          `}
          onClick={() => {
            setFilter("all");
          }}
        >
          전체
        </Button>
        <Button
          css={css`
            background-color: ${filter === "true" ? "red" : "black"};
          `}
          onClick={() => {
            setFilter("true");
          }}
        >
          완료
        </Button>
        <Button
          css={css`
            background-color: ${filter === "false" ? "red" : "black"};
          `}
          onClick={() => {
            setFilter("false");
          }}
        >
          진행중
        </Button>
        총개수 : {li.length}
      </div>
    </div>
  );
};

export default MyForm;
