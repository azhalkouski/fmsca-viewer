import { useState, useEffect } from 'react';
import { TablePagination } from '@mui/material';

import RecordsTableContainer from '../RecordsTableContainer/RecordsTableContainer';
import DebouncedSearchField from '../DebouncedSearchField/DebouncedSearchField';
import DataSourceService from '../../services/data/DBService';
import { DEFAUTL_ORDER_BY } from '../../constants';
import {
  RecordTypeAdapted,
  RecordTypeKeys,
  FetchRecordsFilterType
} from '../../types';


const INITIAL_ROWS_PER_PAGE = 10;

const dataSourceService = new DataSourceService();


const ViewerContainer = () => {
  const [dataInStore, setDataInStore] = useState<RecordTypeAdapted[]>([]);

  // useEffect related state:: fetch records
  const [order, setOrder] = useState<"asc" | "desc">(DEFAUTL_ORDER_BY.filterType);
  const [orderBy, setOrderBy] = useState<RecordTypeKeys>(DEFAUTL_ORDER_BY.recordProperty);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_ROWS_PER_PAGE);
  const [page, setPage] = useState<number>(0);
  const [searchString, setSearchString] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  // Pagination related state
  const [totalCount, setTotalCount] = useState<number>(0);


  useEffect(() => {
    const filterValue: FetchRecordsFilterType = {
      recordProperty: orderBy,
      filterType: order,
      serachString: searchString,
    };
    const start = rowsPerPage * page;
    const end = start + rowsPerPage;
    setIsLoading(true);
    dataSourceService.fetchRecords(start, end, filterValue).then((rowData) => {
      const { batch, totalCount, error } = rowData;
      setDataInStore(batch);
      setTotalCount(totalCount);
      setErrorMessage(error);
      setIsLoading(false);
    });
  }, [setDataInStore, order, orderBy, page, rowsPerPage, searchString]);


  const handleRequestSort = (property: RecordTypeKeys) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchOnChange = (searchStr:  string) => {
    setSearchString(searchStr);
    // update query string ?
  }

  return (
    <div style={{margin: '20px'}}>
      <DebouncedSearchField defaultValue={searchString} onChange={handleSearchOnChange}/>
      <RecordsTableContainer
        records={dataInStore}
        order={order}
        orderBy={orderBy}
        handleRequestSort={handleRequestSort}
        errorMessage={errorMessage}
        isLoading={isLoading}
        
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value));
          setPage(0);
        }}
      />
    </div>
  );
};

export default ViewerContainer;
