export interface RecordTypeRow {
  created_dt: Date;
  data_source_modified_dt: Date;
  entity_type: string | null;
  operating_status: string | null;
  legal_name: string | null;
  dba_name: string | null;
  physical_address: string | null;
  phone: string | null;
  usdot_number: number | null;
  mc_mx_ff_number: string | null;
  power_units: number | null;
  out_of_service_date: Date;
}

export interface RecordTypeAdapted {
  created_dt: Date;
  data_source_modified_dt: Date;
  entity_type: string;
  operating_status: string;
  legal_name: string;
  dba_name: string;
  physical_address: string;
  phone: string;
  usdot_number: number;
  mc_mx_ff_number: string;
  power_units: number;
  out_of_service_date: Date;
}

export type RecordTypeKeys = keyof RecordTypeRow;

export type Column = {
  key: RecordTypeKeys;
  label: string;
};

export interface FetchRecordsFilterType {
  recordProperty: RecordTypeKeys;
  filterType: 'asc' | 'desc';
};

export interface PaginatedRowsBatch {
  batch: RecordTypeAdapted[];
  totalCount: number;
  error: string;
};
