import {
  RecordTypeRow,
  RecordTypeAdapted,
  RecordTypeKeys,
} from '../types';


export function adaptInputRows(rowData: RecordTypeRow[]) {
  return rowData.map((row: RecordTypeRow) => {
    let adaptedRow: Partial<RecordTypeAdapted> = {};
    (Object.keys(row) as RecordTypeKeys[]).forEach((key: RecordTypeKeys) => {
      const value = row[key];
      adaptedRow = {
        ...adaptedRow,
        [key]: value === null
        ? (typeof value === 'number' ? 0 : '')
        : value,
      }
    });

    return adaptedRow as RecordTypeAdapted;
  });
};
