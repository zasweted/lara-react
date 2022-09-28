import { useEffect, useRef, useState } from 'react';
import '../../sass/square.scss';
import axios from 'axios';
import { random } from 'lodash';

function RedSquare({ size, ziggy }) {

    const [text, setText] = useState('');
    const [color, setColor] = useState('#ffffff');
    const [squares, setSquares] = useState([]);

    const refresh = useRef('_1');

    const rand = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    useEffect(() => {
        axios.get(ziggy.url + '/get-square')
            .then(res => setSquares(res.data.squares));
    }, [])

    const add = () => {
        axios.post(ziggy.url + '/add-square', { text, color })
            .then(res => {
            })
            refresh.current = '_' + rand(0, 10);
        setSquares(s => [...s, { text, color }]);
        setText('');
        setColor('#ffffff');
    }
    const reset = () => {
        axios.delete(ziggy.url + '/reset-square')
            
        setSquares([]);
        setText('');
        setColor('#ffffff');
    }

    return (
        <>
            <div className='square-bin'>

                {
                    squares.map((s, i) => <div key={i + refresh.current} className="square" style={{
                        width: size + 'px',
                        height: size + 'px',
                        backgroundColor: s.color,
                    }}>{s.text}</div>)
                }


            </div>
            <div className='input-bin'>
                <button onClick={add} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-5 px-8 border border-blue-500 hover:border-transparent rounded mx-2'>
                    Add
                </button>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                <button onClick={reset} className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-5 px-8 border border-blue-500 hover:border-transparent rounded mx-2'>
                    Reset
                </button>

            </div>

        </>
    )
}

export default RedSquare;