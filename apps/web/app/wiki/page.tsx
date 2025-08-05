'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import WikiView from '@/components/WikiView';

export default function Wiki() {
  return (
    <ProtectedRoute>
      <PageShell title="Company Wiki">
        <WikiView />
      </PageShell>
    </ProtectedRoute>
  );
}