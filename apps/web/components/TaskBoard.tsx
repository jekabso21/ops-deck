'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, MoreVertical } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        title: 'Website Redesign',
        description: 'Update the company website with new branding',
        assignee: 'John Doe',
        priority: 'High',
        dueDate: '2024-01-20',
      },
      {
        id: '2',
        title: 'Database Migration',
        description: 'Migrate user data to new database system',
        assignee: 'Jane Smith',
        priority: 'Medium',
        dueDate: '2024-01-25',
      },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: '3',
        title: 'API Documentation',
        description: 'Write comprehensive API documentation',
        assignee: 'Mike Johnson',
        priority: 'Medium',
        dueDate: '2024-01-22',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: '4',
        title: 'Security Audit',
        description: 'Conduct security audit of the application',
        assignee: 'Sarah Wilson',
        priority: 'High',
        dueDate: '2024-01-18',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '5',
        title: 'User Authentication',
        description: 'Implement user login and registration',
        assignee: 'Alex Brown',
        priority: 'High',
      },
    ],
  },
];

function TaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-400/10 text-red-400';
      case 'Medium':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'Low':
        return 'bg-green-400/10 text-green-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-card border border-border rounded-lg p-4 cursor-grab hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-foreground">{task.title}</h4>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      {task.description && (
        <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {task.assignee}
        </div>
      </div>
      {task.dueDate && (
        <div className="mt-2 text-xs text-muted-foreground">
          Due: {task.dueDate}
        </div>
      )}
    </div>
  );
}

export default function TaskBoard() {
  const [columns, setColumns] = useState(initialData);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Find the source and destination columns
    const sourceColumn = columns.find(col => 
      col.tasks.some(task => task.id === activeId)
    );
    const destColumn = columns.find(col => 
      col.id === overId || col.tasks.some(task => task.id === overId)
    );

    if (!sourceColumn || !destColumn) return;

    const sourceTask = sourceColumn.tasks.find(task => task.id === activeId);
    if (!sourceTask) return;

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Remove task from source column
      const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn.id);
      const sourceTaskIndex = newColumns[sourceColIndex].tasks.findIndex(task => task.id === activeId);
      newColumns[sourceColIndex].tasks.splice(sourceTaskIndex, 1);

      // Add task to destination column
      const destColIndex = newColumns.findIndex(col => col.id === destColumn.id);
      if (destColumn.tasks.some(task => task.id === overId)) {
        // Insert at specific position
        const destTaskIndex = newColumns[destColIndex].tasks.findIndex(task => task.id === overId);
        newColumns[destColIndex].tasks.splice(destTaskIndex, 0, sourceTask);
      } else {
        // Add to end of column
        newColumns[destColIndex].tasks.push(sourceTask);
      }

      return newColumns;
    });

    setActiveId(null);
  };

  const activeTask = activeId ? 
    columns.flatMap(col => col.tasks).find(task => task.id === activeId) : null;

  return (
    <div className="h-full">
      <DndContext 
        sensors={sensors} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
          {columns.map((column) => (
            <div key={column.id} className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">{column.title}</h3>
                <span className="bg-background text-muted-foreground text-xs px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              
              <SortableContext 
                items={column.tasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3 min-h-[200px]">
                  {column.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </SortableContext>

              <button className="w-full mt-4 p-2 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground transition-colors flex items-center justify-center">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </button>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}