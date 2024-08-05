import { Column, FetchRecordsFilterType } from "./types";

export const DEFAUTL_ORDER_BY: FetchRecordsFilterType = {
  recordProperty: 'created_dt',
  filterType: 'asc',
};

export const TABLE_COLUMNS: Column[] = [
  {
    key: 'created_dt',
    label: 'Created_DT'
  },
  {
    key: 'data_source_modified_dt',
    label: 'Modifed_DT'
  },
  {
    key: 'entity_type',
    label: 'Entity'
  },
  {
    key: 'operating_status',
    label: 'Operating status'
  },
  {
    key: 'legal_name',
    label: 'Legal name'
  },
  {
    key: 'dba_name',
    label: 'DBA name'
  },
  {
    key: 'physical_address',
    label: 'Physical address'
  },
  {
    key: 'phone',
    label: 'Phone'
  },
  {
    key: 'usdot_number',
    label: 'DOT'
  },
  {
    key: 'mc_mx_ff_number',
    label: 'MC/MX/FF'
  },
  {
    key: 'power_units',
    label: 'Power units'
  },
  {
    key: 'out_of_service_date',
    label: 'Out of service date'
  },
];

export const fetchRecordsFailedError = 'Internal server error while fetching records.';
