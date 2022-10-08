import { FC } from "react";
import { usePagination } from "../../../hooks/usePagination";

interface PaginationProps {
    totalPages: number;
    page: number;
    changePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({totalPages, page, changePage}) => {
    return (
        <div className='page__wrapper'>
            {usePagination(totalPages).map(p => {
                return (
                    <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={page === p ? 'page page__selected' : 'page'}
                    >   
                        {p}
                    </span>
                )
            })}
      </div>
    );
};

export default Pagination;