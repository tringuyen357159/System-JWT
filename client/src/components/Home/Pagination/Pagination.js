import React from 'react';
import './Pagination.scss'

const Pagination = (props) => {
    const { pagination, onPageChange } = props;
    const {_page, _limit, _totalRows} = pagination;
    const totalPage = Math.ceil(_totalRows / _limit);
    let middlePagination;

    if (totalPage <= 5) {
        middlePagination = [...Array(totalPage)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => onPageChange(idx + 1)}
            disabled={_page === idx + 1}
          >
            {idx + 1}
          </button>
        ));
    }else {
        const startValue = Math.floor((_page - 1) / 5) * 5;
        console.log(startValue);
    
        middlePagination = (
          <>
            {[...Array(5)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={_page === startValue + idx + 1}
                onClick={() => onPageChange(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}
    
            <button>...</button>
            <button onClick={() => onPageChange(totalPage)}>{totalPage}</button>
          </>
        );
    
        if (_page > 5) {
          if (totalPage - _page >= 5) {
            middlePagination = (
              <>
                <button onClick={() => onPageChange(1)}>1</button>
                <button>...</button>
                <button onClick={() => onPageChange(startValue)}>{startValue}</button>
                {[...Array(5)].map((_, idx) => (
                  <button
                    key={startValue + idx + 1}
                    disabled={_page === startValue + idx + 1}
                    onClick={() => onPageChange(startValue + idx + 1)}
                  >
                    {startValue + idx + 1}
                  </button>
                ))}
    
                <button>...</button>
                <button onClick={() => onPageChange(totalPage)}>{totalPage}</button>
              </>
            );
          } else {
            let amountLeft = totalPage - _page + 5;
            middlePagination = (
              <>
                <button onClick={() => onPageChange(1)}>1</button>
                <button>...</button>
                <button onClick={() => onPageChange(startValue)}>{startValue}</button>
                {[...Array(amountLeft)].map((_, idx) => (
                  <button
                    key={startValue + idx + 1}
                    disabled={_page === startValue + idx + 1}
                    style={
                        totalPage < startValue + idx + 1 ? { display: "none" } : null
                    }
                    onClick={() => onPageChange(startValue + idx + 1)}
                  >
                    {startValue + idx + 1}
                  </button>
                ))}
              </>
            );
          }
        }
      }

    return (
        totalPage > 1 && (
            <div className="pagination">
              <button
                className="pagination__prev"
                onClick={() => onPageChange(_page - 1)}
                disabled={_page === 1}
              >
                &#171;
              </button>
              {middlePagination}
              <button
                className="pagination__next"
                onClick={() => onPageChange(_page + 1)}
                disabled={_page === totalPage}
              >
                &#187;
              </button>
            </div>
          )
    )
}

export default Pagination
