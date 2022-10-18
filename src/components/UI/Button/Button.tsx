import { FC } from 'react';
import classes from './Button.module.css';

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    name: string;
}

const Button: FC<ButtonProps> = ({name, ...attributes}) => {
    return (
        <button {...attributes} className={classes.myBtn}>
            {name}
        </button>
    );
};

export default Button;