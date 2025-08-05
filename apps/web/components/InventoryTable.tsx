'use client';

import { useState } from 'react';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  location: string;
  lastUpdated: string;
}

const mockData: InventoryItem[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    category: 'Electronics',
    quantity: 25,
    status: 'In Stock',
    location: 'Office A - Storage',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: 'Office Chair',
    category: 'Furniture',
    quantity: 5,
    status: 'Low Stock',
    location: 'Office B - Floor 2',
    lastUpdated: '2024-01-14',
  },
  {
    id: '3',
    name: 'Printer Paper (A4)',
    category: 'Office Supplies',
    quantity: 0,
    status: 'Out of Stock',
    location: 'Storage Room',
    lastUpdated: '2024-01-13',
  },
  {
    id: '4',
    name: 'Standing Desk',
    category: 'Furniture',
    quantity: 12,
    status: 'In Stock',
    location: 'Office A - Floor 1',
    lastUpdated: '2024-01-12',
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    category: 'Electronics',
    quantity: 45,
    status: 'In Stock',
    location: 'Office A - Storage',
    lastUpdated: '2024-01-11',
  },
];

export default function InventoryTable() {
  const [data, setData] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof InventoryItem>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field: keyof InventoryItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-400/10 text-green-400';
      case 'Low Stock':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'Out of Stock':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'category', label: 'Category' },
                  { key: 'quantity', label: 'Quantity' },
                  { key: 'status', label: 'Status' },
                  { key: 'location', label: 'Location' },
                  { key: 'lastUpdated', label: 'Last Updated' },
                ].map((header) => (
                  <th
                    key={header.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort(header.key as keyof InventoryItem)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header.label}</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {item.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-card px-4 py-3 flex items-center justify-between border-t border-border sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-muted-foreground bg-card hover:bg-muted disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-muted-foreground bg-card hover:bg-muted disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, sortedData.length)}
                </span>{' '}
                of <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border bg-card text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-primary border-primary text-primary-foreground'
                        : 'bg-card border-border text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border bg-card text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}