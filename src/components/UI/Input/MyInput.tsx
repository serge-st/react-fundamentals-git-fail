import { FC } from 'react';
import classes from './MyInput.module.css';

interface MyInputProps extends React.ComponentPropsWithoutRef<"input"> {
}

const MyInput: FC<MyInputProps> = ({...attributes}) => {

    return (
        <input 
            {...attributes}
            className={classes.myInput}
        />
    );
};

export default MyInput;