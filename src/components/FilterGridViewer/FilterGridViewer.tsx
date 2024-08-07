import { useState, useEffect } from 'react';
import { DataGrid, GridFilterModel } from '@mui/x-data-grid';

import { TABLE_COLUMNS } from '../../constants';
import DataSourceService from '../../services/data/DBService';
import {
  RecordTypeAdapted,
} from '../../types';

const columns = TABLE_COLUMNS.map((column) => {
  return { field: column.key, headerName: column.label, width: 150 };
});

const dataSourceService = new DataSourceService();

const FilterGridViewer = () => {
  const [allRecords, setAllRecords] = useState<RecordTypeAdapted[]>([]);

  useEffect(() => {
    dataSourceService.fetchAllRecords().then((rowData) => {
      setAllRecords(rowData);
    });
  }, [setAllRecords]);


  const onFilterModelChange = (filerModel: GridFilterModel) => {
    console.log('filterModel', filerModel);
  }

  const getGridRows = allRecords.map((record) => {
    const rId = `${record[TABLE_COLUMNS[0].key]}${record[TABLE_COLUMNS[2].key]}-${record[TABLE_COLUMNS[6].key]}`;
    let gridRecord = {id: rId};
    TABLE_COLUMNS.forEach(({key, label}) => {
      gridRecord = {
        ...gridRecord,
        [key]: record[key]
      }
    });
    return gridRecord;
  });

  return (
    <div style={{margin: '20px'}}>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={getGridRows}
          columns={columns}
          pagination
          onFilterModelChange={onFilterModelChange}
        />
      </div>
    </div>
  );
};

export default FilterGridViewer;
