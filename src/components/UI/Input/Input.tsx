import { FC } from 'react'
import classes from './Input.module.css'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
}

const Input: FC<InputProps> = ({ ...attributes }) => {
  return (
    <input
      {...attributes}
      className={classes.myInput}
    />
  )
}

export default Input
