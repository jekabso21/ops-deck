'use client';

import { DocumentTextIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface FormItem {
  id: string;
  title: string;
  description: string;
  type: 'leave_request' | 'expense_report' | 'feedback' | 'custom';
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedBy?: string;
  submittedAt?: string;
  dueDate?: string;
}

const mockForms: FormItem[] = [
  {
    id: '1',
    title: 'Vacation Leave Request',
    description: 'Request time off for vacation or personal days',
    type: 'leave_request',
    status: 'draft',
  },
  {
    id: '2',
    title: 'Expense Report',
    description: 'Submit business expenses for reimbursement',
    type: 'expense_report',
    status: 'draft',
  },
  {
    id: '3',
    title: 'Employee Feedback',
    description: 'Provide feedback on workplace improvements',
    type: 'feedback',
    status: 'draft',
  },
  {
    id: '4',
    title: 'IT Equipment Request',
    description: 'Request new hardware or software',
    type: 'custom',
    status: 'submitted',
    submittedBy: 'John Doe',
    submittedAt: '2024-01-15',
    dueDate: '2024-01-20',
  },
  {
    id: '5',
    title: 'Training Request',
    description: 'Request approval for training or conference attendance',
    type: 'custom',
    status: 'approved',
    submittedBy: 'Jane Smith',
    submittedAt: '2024-01-10',
  },
];

export default function FormList() {
  const getStatusColor = (status: FormItem['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-400/10 text-gray-400';
      case 'submitted':
        return 'bg-blue-400/10 text-blue-400';
      case 'approved':
        return 'bg-green-400/10 text-green-400';
      case 'rejected':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: FormItem['status']) => {
    switch (status) {
      case 'submitted':
        return <ClockIcon className="h-4 w-4" />;
      case 'approved':
        return <CheckCircleIcon className="h-4 w-4" />;
      default:
        return <DocumentTextIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {mockForms.map((form) => (
        <div
          key={form.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <DocumentTextIcon className="h-5 w-5 text-lime-400" />
                <h3 className="text-lg font-medium text-foreground">{form.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{form.description}</p>
              
              {form.submittedBy && (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Submitted by: {form.submittedBy}</p>
                  <p>Date: {form.submittedAt}</p>
                  {form.dueDate && <p>Due: {form.dueDate}</p>}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(form.status)}`}>
                {getStatusIcon(form.status)}
                <span className="ml-1 capitalize">{form.status}</span>
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="text-sm text-lime-400 hover:text-lime-300 font-medium">
              {form.status === 'draft' ? 'Start Form' : 'View Details'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}