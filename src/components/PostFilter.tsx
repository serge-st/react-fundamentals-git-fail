import { FC } from 'react';
import Input from './UI/Input/Input';
import MySelect from './UI/Select/MySelect';

export type FilterOptions = {
    sort: string;
    query: string;
}

interface PostFilterProps {
    filter: FilterOptions;
    setFilter: ({}: FilterOptions) => void;
}

const PostFilter: FC<PostFilterProps> = ({filter, setFilter}) => {
    return (
        <div>
            <Input
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
            placeholder='Search...'
            />

            <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue='Sort By'
            options={[
                {value: 'title', name: 'By Name'},
                {value: 'body', name: 'By Description'}
            ]}
            />
      </div>
    );
};

export default PostFilter;