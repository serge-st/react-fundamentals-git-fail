import { FC } from "react";

type Option = {
    value: string,
    name: string,
}

interface MySelectProps {
    options: Option[];
    defaultValue: string;
    value: string;
    onChange: (x: string) => void;
}

const MySelect: FC<MySelectProps> = ({options, defaultValue, value, onChange}) => {
    console.log(options);
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </select>
    );
};

export default MySelect;