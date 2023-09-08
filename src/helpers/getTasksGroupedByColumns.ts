import { databases } from './../../appwrite.ts'
import { Board, Column, TypedColumn } from '@/types'

export const getTasksGroupedByColumns = async () => {
  const data = await databases?.listDocuments(import.meta.env.VITE_DATABASE_ID!, import.meta.env.VITE_TASKS_COLLECTION_ID!)

  const tasks = data.documents
  console.log(tasks)

  const columns = tasks.reduce((acc, task) => {
    if (!acc.get(task.status)) {
      acc.set(task.status, {
        id: task.status,
        tasks: [],
      })
    }

    acc.get(task.status)!.tasks.push({
      $id: task.$id,
      $createdAt: task.$createdAt,
      title: task.title,
      status: task.status,
    })

    return acc
  }, new Map<TypedColumn, Column>())

  const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done']

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        tasks: [],
      })
    }
  }

  const sortedColumns = new Map(Array.from(columns.entries()).sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])))

  const board: Board = {
    columns: sortedColumns,
  }

  return board
}
