import TodoInput from '../todoInput/TodoInput';
import TodoList from '../todoList/TodoList';
import './Todos.scss';

const Todos = () => {
    return (
        <div className='Todos'>
            <h2>할일 만들기</h2>
            <TodoInput />
            <TodoList />
        </div>
    );
};

export default Todos;
