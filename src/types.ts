export interface Board {
  columns: Map<TypedColumn, Column>
}

export type TypedColumn = 'todo' | 'inprogress' | 'done'

export interface Column {
  id: TypedColumn
  tasks: Task[]
}

export interface Task {
  $id: string
  $createdAt: string
  title: string
  status: TypedColumn
}

export interface RadioTaskType {
  id: TypedColumn
  name: string
  description: string
  color: string
}
