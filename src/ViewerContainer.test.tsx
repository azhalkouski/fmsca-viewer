import React from 'react';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import {setupServer} from 'msw/node';
import userEvent from '@testing-library/user-event';
import TableComponent from './components/ViewerContainer/ViewerContainer';
import data from './mockRecords.json';
import { fetchRecordsFailedError } from './constants';

/**
 * The tests are not working due to issue with typescript configuration and 
 * issues with importing `import { http, HttpResponse } from 'msw';`
 * 
 * Although, the tests don't run, you can see the approach to testing. These tests
 * aim to test components behaviours rather then implementation details.
 */

const server = setupServer(
  http.get('/output.json', () => {
    return HttpResponse.json(data)
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders 20 rows in the table', async () => {
  render(<TableComponent />);

  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(21);
});

test('renders error message instead of the table on internal server error', async () => {
  render(<TableComponent />);

  const rows = screen.getByText(fetchRecordsFailedError);
  expect(rows).toHaveLength(21);
});

test('pagination switches next page', async () => {
  render(<TableComponent />);

  await userEvent.click(screen.getByTitle('Go to next page'));
  const paginationText = await screen.findByText('11–20 of 20');

  expect(paginationText).toBeInTheDocument();
});

test('the list is sorted on column click', async () => {
  const expectedRecord = 'some_fake_record';

  render(<TableComponent />);

  const sortableColumnText = screen.getByRole('button', { name: 'Created_DT' });
  await userEvent.click(sortableColumnText);
  
  const rows = screen.getAllByRole('row');

  expect(rows[0]).toEqual(expectedRecord);
});
