import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import './TodoList.scss';

const TodoList = () => {
    const { data } = useSelector((state) => state.todosR);
    return (
        <ul className='TodoList'>
            {data.map((item) => (
                <TodoItem key={item.id} {...item} />
            ))}
        </ul>
    );
};

export default TodoList;
