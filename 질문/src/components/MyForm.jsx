import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyForm = () => {
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        navigate('/result', {
            state: {
                age: age,
                name: name,
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='이름 입력'
                />
            </div>
            <div>
                <label>Age:</label>
                <input
                    type='number'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder='나이 입력'
                />
            </div>

            <button type='submit'>확인</button>
        </form>
    );
};

export default MyForm;
