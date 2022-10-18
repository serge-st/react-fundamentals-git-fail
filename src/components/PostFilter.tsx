import { FC, ChangeEvent } from 'react'
import Input from './UI/Input/Input'
import Select from './UI/Select/Select'

export interface FilterOptions {
  sort: string
  query: string
}

interface PostFilterProps {
  filter: FilterOptions
  setFilter: ({}: FilterOptions) => void
}

const PostFilter: FC<PostFilterProps> = ({ filter, setFilter }) => {
  return (
    <div>
      <Input
        value={filter.query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter({ ...filter, query: e.target.value })}
        placeholder='Search...'
      />

      <Select
        value={filter.sort}
        onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
        defaultValue='Sort By'
        options={[
          { value: 'title', name: 'By Name' },
          { value: 'body', name: 'By Description' },
          { value: 'id', name: 'By ID' }
        ]}
      />
    </div>
  )
}

export default PostFilter
