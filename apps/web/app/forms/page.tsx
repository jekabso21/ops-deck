'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import FormList from '@/components/FormList';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function Forms() {
  return (
    <ProtectedRoute>
      <PageShell>
        <div className="space-y-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Company Forms</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Submit and manage internal company forms and requests
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-muted-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400"
              >
                <FunnelIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Filter
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create Form
              </button>
            </div>
          </div>

          <FormList />
        </div>
      </PageShell>
    </ProtectedRoute>
  );
}