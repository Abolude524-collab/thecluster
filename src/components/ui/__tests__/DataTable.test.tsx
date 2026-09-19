import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable, Column } from '../DataTable';

interface MockData {
  id: string;
  name: string;
  views: number;
}

const mockColumns: Column<MockData>[] = [
  { key: 'name', header: 'Content Name', sortable: true },
  { key: 'views', header: 'Views', sortable: true, align: 'right' },
];

const mockData: MockData[] = [
  { id: '1', name: 'First Post', views: 100 },
  { id: '2', name: 'Second Post', views: 500 },
];

describe('DataTable Component', () => {
  it('renders column headers and row data correctly', () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
      />
    );

    expect(screen.getByText('Content Name')).toBeInTheDocument();
    expect(screen.getByText('Views')).toBeInTheDocument();
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  it('triggers onRowClick when a row is clicked', () => {
    const handleRowClick = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        onRowClick={handleRowClick}
      />
    );

    fireEvent.click(screen.getByText('First Post'));
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });
});
