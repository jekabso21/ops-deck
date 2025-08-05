'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import CalendarView from '@/components/CalendarView';

export default function Calendar() {
  return (
    <ProtectedRoute>
      <PageShell title="Calendar">
        <CalendarView />
      </PageShell>
    </ProtectedRoute>
  );
}