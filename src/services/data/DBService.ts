import { RecordTypeRow, FetchRecordsFilterType, PaginatedRowsBatch } from '../../types';
import AbstractDataSourceService from './AbstractDataSourceService';

import { adaptInputRows } from '../../utils/utils';
import { fetchRecordsFailedError } from '../../constants';


class DataSourceService implements AbstractDataSourceService {
  async fetchRecords(start: number, end: number, filter: FetchRecordsFilterType): Promise<PaginatedRowsBatch> {
    try {
      const response = await fetch('/output.json');
      const data: RecordTypeRow[] = await response.json();
      const adaptedData = adaptInputRows(data);

      // in a real world application the sorting functionality with
      // such a big data would be done at the database layer
      // and the appliation server would return a batch of data
      // sliced from a sorted data sequence
      const batch = adaptedData
        .sort((a, b) => {
          const { recordProperty, filterType } = filter;
          const orderBy = recordProperty;
          const order = filterType;

          if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
          if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
          return 0;
        })
        .slice(start, end);

      return { batch: batch, totalCount: adaptedData.length, error: ''};
    } catch (e) {
      console.error(`Something happened ${JSON.stringify(e)}`);
      // log error to external logs database if one is in use
      return { batch: [], totalCount: 0, error: fetchRecordsFailedError};
    }
  }
};


export default DataSourceService;
