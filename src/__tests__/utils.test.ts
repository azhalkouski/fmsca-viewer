import { adaptInputRows } from '../utils/utils';
import { RecordTypeRow, RecordTypeAdapted } from '../types';

it('should replace null values with default values correctly', () => {
  const input: RecordTypeRow[] = [
    {
      created_dt: new Date('2022-01-01'),
      data_source_modified_dt: new Date('2022-01-01'),
      entity_type: null,
      operating_status: 'active',
      legal_name: 'Company A',
      dba_name: null,
      physical_address: '123 Main St',
      phone: null,
      usdot_number: null,
      mc_mx_ff_number: 'ABC123',
      power_units: null,
      out_of_service_date: new Date('2023-01-01')
    }
  ];
  
  const expectedOutput: RecordTypeAdapted[] = [
    {
      created_dt: new Date('2022-01-01'),
      data_source_modified_dt: new Date('2022-01-01'),
      entity_type: '',
      operating_status: 'active',
      legal_name: 'Company A',
      dba_name: '',
      physical_address: '123 Main St',
      phone: '',
      usdot_number: 0,
      mc_mx_ff_number: 'ABC123',
      power_units: 0,
      out_of_service_date: new Date('2023-01-01')
    }
  ];
  
  expect(adaptInputRows(input)).toEqual(expectedOutput);
});