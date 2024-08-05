import {
  RecordTypeRow,
  RecordTypeAdapted,
  RecordTypeKeys,
} from '../types';


export function adaptInputRows(rowData: RecordTypeRow[]) {
  const numberProperties = ['usdot_number', 'power_units'];

  return rowData.map((row: RecordTypeRow) => {
    let adaptedRow: Partial<RecordTypeAdapted> = {};
    (Object.keys(row) as RecordTypeKeys[]).forEach((key: RecordTypeKeys) => {
      const value = row[key];
      adaptedRow = {
        ...adaptedRow,
        [key]: value === null
        ? (numberProperties.includes(key) ? 0 : '')
        : value,
      }
    });

    return adaptedRow as RecordTypeAdapted;
  });
};
