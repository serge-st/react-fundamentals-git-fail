import { useState } from "react";

const Input = () => {
    const [value, setValue] = useState('INPUT TEXT');

    return (
        <>
            <h1>{value}</h1>
      
            <input 
                type="text" 
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </>
    );
};

export default Input;