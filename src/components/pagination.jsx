import React, {useEffect} from 'react'
import { Pagination, Page } from '../styles/pagination'

const Paginations = props => {
  const {totalPages, currentPage} = props

  const handlePagination = item => {
    return props.changePage(item)
  }

  const handleLoadPageCounter = () => {
    const arr = [];
    let startPage
    let endPage

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      arr.push(i);
    }

    return arr.map(item => (
      <Page key={item} onClick={() => handlePagination(item)}>{item}</Page>
    ));
  };

  return (
    <Pagination>
      {handleLoadPageCounter()}
    </Pagination>
  )
}

export default Paginations
