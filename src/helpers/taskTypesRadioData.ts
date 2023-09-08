import { RadioTaskType } from '@/types'

export const types: RadioTaskType[] = [
  {
    id: 'todo',
    name: 'Todo',
    description: 'A new task to start doing',
    color: 'bg-red-500',
  },
  {
    id: 'inprogress',
    name: 'In Progress',
    description: 'A task that is currently being worked on',
    color: 'bg-yellow-500',
  },
  {
    id: 'done',
    name: 'Done',
    description: 'A task that was completed',
    color: 'bg-green-500',
  },
]
