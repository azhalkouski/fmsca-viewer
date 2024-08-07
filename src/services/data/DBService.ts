import { RecordTypeRow, FetchRecordsFilterType, PaginatedRowsBatch } from '../../types';
import AbstractDataSourceService from './AbstractDataSourceService';

import { adaptInputRows } from '../../utils/utils';
import { fetchRecordsFailedError } from '../../constants';
import { RecordTypeAdapted } from '../../types'


async function fetchAndAdapteAll(adapterFn: (rowData: RecordTypeRow[]) => RecordTypeAdapted[]) {
  const response = await fetch('/output.json');
  const data: RecordTypeRow[] = await response.json();
  return adapterFn(data);
}


class DataSourceService implements AbstractDataSourceService {
  async fetchRecords(start: number, end: number, filter: FetchRecordsFilterType): Promise<PaginatedRowsBatch> {
    try {
      const adaptedData = await fetchAndAdapteAll(adaptInputRows);

      const fiterPredicate = (searchStr: string) => (el: RecordTypeRow) => {
        if (searchStr === "") {
          return true;
        };

        return Object.values(el).includes(searchStr);
      };

      const filteredData = adaptedData.filter(fiterPredicate(filter.serachString));

      const batch = filteredData
        .sort((a, b) => {
          const { recordProperty, filterType } = filter;
          const orderBy = recordProperty;
          const order = filterType;

          if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
          if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
          return 0;
        })
        .slice(start, end);

      return { batch: batch, totalCount: filteredData.length, error: ''};
    } catch (e) {
      console.error(`Something happened ${JSON.stringify(e)}`);
      // log error to external logs database if one is in use
      return { batch: [], totalCount: 0, error: fetchRecordsFailedError};
    }
  }

  async fetchAllRecords(): Promise<RecordTypeAdapted[]> {
    try {
      const adaptedData = await fetchAndAdapteAll(adaptInputRows);

      return adaptedData;
    } catch (e) {
      console.error(`Something happened ${JSON.stringify(e)}`);
      // log error to external logs database if one is in use
      return [];
    }
  }
};


export default DataSourceService;
