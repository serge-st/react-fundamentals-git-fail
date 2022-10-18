import { FC } from 'react'
import cl from './Select.module.css'

interface Option {
  value: string
  name: string
}

interface SelectProps {
  options: Option[]
  defaultValue: string
  value: string
  onChange: (x: string) => void
}

const Select: FC<SelectProps> = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={event => onChange(event.target.value)}
      className={cl.mySelect}
    >
      <option disabled value=''>{defaultValue}</option>
      {options.map(option =>
        <option key={option.value} value={option.value}>{option.name}</option>
      )}
    </select>
  )
}

export default Select
