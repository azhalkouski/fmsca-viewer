import { PaginatedRowsBatch, FetchRecordsFilterType } from '../../types';


abstract class AbstractDataSourceService {
  abstract fetchRecords(start: number, end: number, filter?: FetchRecordsFilterType): Promise<PaginatedRowsBatch>;
};

export default AbstractDataSourceService;
