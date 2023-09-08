import React from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskCard from '@/components/TaskCard'
import { useModalStore } from '@/store/ModalStore.ts'
import { types } from '@/helpers/taskTypesRadioData.ts'
import { useBoardStore } from '@/store/TaskBoardStore.ts'
import { RadioTaskType, Task, TypedColumn } from '@/types'

type ColumnProps = {
  id: TypedColumn
  tasks: Task[]
  index: number
}

const idToColumnText: {
  [key in TypedColumn]: string
} = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
}

const idToTaskTypeRadio: {
  [key in TypedColumn]: RadioTaskType
} = {
  todo: types[0],
  inprogress: types[1],
  done: types[2],
}

const Column: React.FC<ColumnProps> = ({ id, tasks, index }) => {
  const openModal = useModalStore((state) => state.openModal)
  const setNewTaskType = useBoardStore((state) => state.setNewTaskType)

  const handleAddTaskButtonClick = () => {
    setNewTaskType(idToTaskTypeRadio[id])
    openModal()
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`rounded-2xl p-2 shadow-sm ${snapshot.isDraggingOver ? 'bg-green-500' : 'bg-[#06bfe2]'}`}
              >
                <h2 className="flex justify-between p-2 text-xl font-bold">
                  {idToColumnText[id]}
                  <span className="rounded-full bg-gray-200 px-2 py-1 text-sm font-normal text-gray-500">{tasks.length}</span>
                </h2>

                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <Draggable key={task.$id} draggableId={task.$id} index={index}>
                      {(provided) => (
                        <TaskCard
                          task={task}
                          index={index}
                          id={task.status}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button onClick={handleAddTaskButtonClick} className="text-yellow-200 hover:text-yellow-400">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default Column
