import { createSlice } from '@reduxjs/toolkit';

const dataList = [
    { id: 1, text: '점심시간', isChk: false },
    { id: 2, text: '운동하기', isChk: false },
    { id: 3, text: '친구만나기', isChk: false },
    { id: 4, text: '놀이기구타기', isChk: false },
    { id: 5, text: '여행가기', isChk: false },
];
const initialState = {
    data: dataList,
    text: '아무말..',
};

let no = initialState.data.length + 1;

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        onAdd: (state, action) => {
            state.data.push({ id: no++, text: action.payload, isChk: false });
        },
        onDel: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        onToggle1: (state, action) => {
            state.data = state.data.map((item) =>
                item.id === action.payload ? { ...item, isChk: !item.isChk } : item
            );
        },
        onToggle: (state, action) => {
            const todo = state.data.find((item) => item.id === action.payload);
            if (todo) {
                todo.isChk = !todo.isChk;
            }
        },
        changeInput: (state, action) => {
            state.text = action.payload;
        },
    },
});

export const { onAdd, onDel, onToggle, changeInput } = todoSlice.actions;
export default todoSlice.reducer;
