'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import InventoryTable from '@/components/InventoryTable';
import { Plus } from 'lucide-react';

export default function Inventory() {
  return (
    <ProtectedRoute>
      <PageShell title="Inventory">
        <div className="space-y-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Track and manage company assets and resources
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Plus className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                Add Item
              </button>
            </div>
          </div>

          <InventoryTable />
        </div>
      </PageShell>
    </ProtectedRoute>
  );
}