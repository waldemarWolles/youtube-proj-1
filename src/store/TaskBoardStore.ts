import { ID, databases } from './../../appwrite.ts'
import { getTasksGroupedByColumns } from '@/helpers/getTasksGroupedByColumns.ts'
import { Board, Column, RadioTaskType, Task, TypedColumn } from '@/types'
import { create } from 'zustand'

interface BoardState {
  board: Board
  fetchBoardData: () => void
  setBoardState: (board: Board) => void
  updateTaskInDB: (task: Task, columnId: TypedColumn) => void
  deleteTask: (taskIndex: number, task: Task, id: TypedColumn) => void
  newTaskInput: string
  setNewTaskInput: (value: string) => void
  newTaskType: RadioTaskType | null
  setNewTaskType: (value: RadioTaskType) => void
  addNewTask: (taskTitle: string, columnId: TypedColumn) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  fetchBoardData: async () => {
    const board = await getTasksGroupedByColumns()
    set({ board })
  },
  setBoardState: async (board) => set({ board }),

  updateTaskInDB: async (task, columnId) => {
    await databases.updateDocument(import.meta.env.VITE_DATABASE_ID!, import.meta.env.VITE_TASKS_COLLECTION_ID!, task.$id, {
      title: task.title,
      status: columnId,
    })
  },
  deleteTask: async (taskIndex, task, id) => {
    set((state) => {
      const updatedColumns = state.board.columns

      updatedColumns?.get(id)?.tasks.splice(taskIndex, 1)

      return { board: { columns: updatedColumns } }
    })

    await databases.deleteDocument(import.meta.env.VITE_DATABASE_ID!, import.meta.env.VITE_TASKS_COLLECTION_ID!, task.$id)
  },
  newTaskInput: '',
  setNewTaskInput: (value) => set({ newTaskInput: value }),
  newTaskType: null,
  setNewTaskType: (value) => set({ newTaskType: value }),
  addNewTask: async (taskTitle, columnId) => {
    const { $id, $createdAt } = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID!,
      import.meta.env.VITE_TASKS_COLLECTION_ID!,
      ID.unique(),
      {
        title: taskTitle,
        status: columnId,
      }
    )
    set({ newTaskInput: '', newTaskType: null })
    set((state) => {
      const updatedColumns = state.board.columns
      const newTask: Task = {
        $id,
        $createdAt,
        title: taskTitle,
        status: columnId,
      }

      const column = updatedColumns?.get(columnId)

      if (!column) {
        updatedColumns?.set(columnId, { id: columnId, tasks: [newTask] })
      } else {
        updatedColumns?.get(columnId)?.tasks.push(newTask)
      }

      return { board: { columns: updatedColumns } }
    })
  },
}))
