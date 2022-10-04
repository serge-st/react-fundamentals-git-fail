import { FC } from 'react';
import classes from './MyButton.module.css';

interface MyButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    name: string;
}

const MyButton: FC<MyButtonProps> = ({name, ...attributes}) => {
    return (
        <button {...attributes} className={classes.myBtn}>
            {name}
        </button>
    );
};

export default MyButton;