import { useBoardStore } from '@/store/TaskBoardStore'
import { Task, TypedColumn } from '@/types'
import { XCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'

type TaskCardProps = {
  task: Task
  index: number
  id: TypedColumn
  innerRef: (el: HTMLElement | null) => void
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, id, innerRef, draggableProps, dragHandleProps }) => {
  const deleteTask = useBoardStore((state) => state.deleteTask)

  const handleDeleteTask = () => {
    if (confirm(`Are you sure you want to delete this task: ${task.title} ?`)) {
      deleteTask(index, task, id)
    }
  }

  return (
    <div className="space-y-2 rounded-md bg-white drop-shadow-md  " {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="flex items-center justify-between p-5">
        <p>{task.title}</p>
        <button onClick={handleDeleteTask} className="text-red-500 hover:text-red-600">
          <XCircleIcon className="ml-5 h-8 w-8 " />
        </button>
      </div>
    </div>
  )
}

export default TaskCard
