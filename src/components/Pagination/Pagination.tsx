/* eslint-disable no-unused-vars */
import {
  PaginationLi,
  PaginationNav,
  PaginationNext,
  PaginationPageActual,
  PaginationPageLimit,
  PaginationPrev,
  PaginationUl,
} from './styles';

interface Props {
  page: number;
  onChangePage: (index: number) => void;
  pageCount: number;
}

const Pagination = ({ page, onChangePage, pageCount }: Props) => (
  <PaginationNav>
    <PaginationUl>
      <PaginationLi>
        <PaginationPrev
          onClick={() => {
            if (page > 1) {
              onChangePage(page - 1);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9.247"
            height="17.889"
            viewBox="0 0 8.247 16.889"
          >
            <path
              id="Vector"
              d="M5.839,14.073,0,7.036,5.839,0"
              transform="translate(7.247 15.481) rotate(180)"
              fill="none"
              stroke="#171717"
            />
          </svg>
        </PaginationPrev>
      </PaginationLi>
      <PaginationPageActual>{page}</PaginationPageActual>
      <PaginationLi>de</PaginationLi>
      <PaginationPageLimit onClick={() => onChangePage(pageCount)}>
        {pageCount}
      </PaginationPageLimit>
      <PaginationLi>
        <PaginationNext
          onClick={() => {
            if (pageCount > page) {
              onChangePage(page + 1);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9.247"
            height="17.889"
            viewBox="0 0 8.247 16.889"
          >
            <path
              id="Vector"
              d="M5.839,14.073,0,7.036,5.839,0"
              transform="translate(7.247 15.481) rotate(180)"
              fill="none"
              stroke="#171717"
            />
          </svg>
        </PaginationNext>
      </PaginationLi>
    </PaginationUl>
  </PaginationNav>
);

export default Pagination;
