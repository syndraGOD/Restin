import { useDispatch, useSelector } from 'react-redux';
import { changeInput, onAdd } from '../../../store/modules/todoSlice';

import './TodoInput.scss';

const TodoInput = () => {
    const { text } = useSelector((state) => state.todosR);
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch(onAdd(text));
        dispatch(changeInput(''));
    };

    return (
        <form className='TodoInput' onSubmit={onSubmit}>
            <input
                type='text'
                name='text'
                value={text}
                onChange={(e) => dispatch(changeInput(e.target.value))}
            />
            <button type='submit'>추가</button>
        </form>
    );
};

export default TodoInput;
