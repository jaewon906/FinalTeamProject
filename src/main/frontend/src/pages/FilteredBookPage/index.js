import React from 'react'
import FilteredBookList from '../../component/Book/FilteredBookList/FilteredBookList'

function FilteredBookListPage({category}) {
  return (
    <FilteredBookList category={category} />
  )
}

export default FilteredBookListPage