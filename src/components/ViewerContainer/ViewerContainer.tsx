import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, Paper
} from '@mui/material';

import DataSourceService from '../../services/data/DBService';
import { TABLE_COLUMNS, DEFAUTL_ORDER_BY } from '../../constants';
import {
  RecordTypeAdapted,
  RecordTypeKeys,
  FetchRecordsFilterType
} from '../../types';


const INITIAL_ROWS_PER_PAGE = 10;

const dataSourceService = new DataSourceService();


const ViewerContainer = () => {
  const [dataInStore, setDataInStore] = useState<RecordTypeAdapted[]>([]);
  const [order, setOrder] = useState< "asc" | "desc">(DEFAUTL_ORDER_BY.filterType);
  const [orderBy, setOrderBy] = useState<RecordTypeKeys>(DEFAUTL_ORDER_BY.recordProperty);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_ROWS_PER_PAGE);
  const [page, setPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [errorMessage, serErrorMessage] = useState<string>('');


  useEffect(() => {
    const filterValue: FetchRecordsFilterType = { recordProperty: orderBy, filterType: order };
    const start = rowsPerPage * page;
    const end = start + rowsPerPage;
    dataSourceService.fetchRecords(start, end, filterValue).then((rowData) => {
      const { batch, totalCount, error } = rowData;
      setDataInStore(batch);
      setTotalCount(totalCount);
      serErrorMessage(error);
    });
  }, [setDataInStore, order, orderBy, page, rowsPerPage]);


  const handleRequestSort = (property: RecordTypeKeys) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (errorMessage !== '') {
    return (
      <div>Sorry, something went wrong while fetching the records.</div>
    );
  }


  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map((e) => {
                return (
                  <TableCell key={e.key}>
                    <TableSortLabel
                      active={orderBy === e.key}
                      direction={orderBy === e.key ? order : 'asc'}
                      onClick={() => handleRequestSort(e.key)}
                    >
                      {e.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataInStore.map((row, index) => (
              <TableRow key={index}>
                {TABLE_COLUMNS.map((e) => {
                  return (
                    <TableCell key={e.key}>{row[e.key].toString()}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};

export default ViewerContainer;
