'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import TaskBoard from '@/components/TaskBoard';
import { Plus, SlidersHorizontal } from 'lucide-react';

export default function Tasks() {
  return (
    <ProtectedRoute>
      <PageShell title="Tasks">
        <div className="h-full flex flex-col space-y-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Organize and track project tasks with drag-and-drop kanban board
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-muted-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400"
              >
                <SlidersHorizontal className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                Filter
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Plus className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                New Task
              </button>
            </div>
          </div>

          <div className="flex-1">
            <TaskBoard />
          </div>
        </div>
      </PageShell>
    </ProtectedRoute>
  );
}