import { FC, useState } from 'react';
import classes from './MyInput.module.css';

interface MyInputProps extends React.ComponentPropsWithoutRef<"input"> {
}

const MyInput: FC<MyInputProps> = ({...attributes}) => {
    // const [value, setValue] = useState('');

    return (
        <input 
            {...attributes}
            className={classes.myInput}
            // value={value}
            // onChange={event => setValue(event.target.value)}    
        />
    );
};

export default MyInput;