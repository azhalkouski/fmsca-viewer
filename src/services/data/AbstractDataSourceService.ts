import {
  PaginatedRowsBatch,
  FetchRecordsFilterType,
  RecordTypeAdapted,
} from '../../types';


abstract class AbstractDataSourceService {
  abstract fetchRecords(start: number, end: number, filter?: FetchRecordsFilterType): Promise<PaginatedRowsBatch>;
  abstract fetchAllRecords(): Promise<RecordTypeAdapted[]>;
};

export default AbstractDataSourceService;
