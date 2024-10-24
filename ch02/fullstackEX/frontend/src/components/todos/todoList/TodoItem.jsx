import { useDispatch } from 'react-redux';
import { onDel, onToggle } from '../../../store/modules/todoSlice';

const TodoItem = ({ id, text, isChk }) => {
    const dispatch = useDispatch();
    return (
        <li style={{ color: isChk ? 'red' : '#000' }}>
            <div>
                <input type='checkbox' checked={isChk} onChange={() => dispatch(onToggle(id))} />
                <em>{text} </em>
            </div>
            <button onClick={() => dispatch(onDel(id))}>삭제</button>
        </li>
    );
};

export default TodoItem;
