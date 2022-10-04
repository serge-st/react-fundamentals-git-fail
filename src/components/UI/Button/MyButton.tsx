import { FC, HTMLAttributes } from 'react';
import classes from './MyButton.module.css';

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
}

const MyButton: FC<MyButtonProps> = ({name, ...htmlAttributes}) => {
    return (
        <button {...htmlAttributes} className={classes.myBtn}>
            {name}
        </button>
    );
};

export default MyButton;