import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper
} from '@mui/material';
import { TABLE_COLUMNS, isLoadingText } from '../../constants';
import {
  RecordTypeAdapted,
  RecordTypeKeys
} from '../../types';

const RecordsTableContainer = ({
  records,
  orderBy,
  order,
  handleRequestSort,
  errorMessage,
  isLoading
}: {
  records: RecordTypeAdapted[];
  orderBy: RecordTypeKeys;
  order: "asc" | "desc";
  handleRequestSort: (property: RecordTypeKeys) => void;
  errorMessage: string;
  isLoading: boolean;
}) => {

  if (errorMessage !== '') {
    return (
      <div>{errorMessage}</div>
    );
  }

  if (isLoading) {
    return (
      <div>{isLoadingText}</div>
    );
  }

  return (
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
            {records.map((row, index) => (
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
  );
};

export default RecordsTableContainer;
