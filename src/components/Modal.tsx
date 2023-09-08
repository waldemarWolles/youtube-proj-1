import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/TaskBoardStore'
import { TaskTypeRadioGroup } from '@/components'

const Modal: React.FC = () => {
  const [newTaskInput, newTaskType, setNewTaskInput, addNewTask] = useBoardStore((state) => [
    state.newTaskInput,
    state.newTaskType,
    state.setNewTaskInput,
    state.addNewTask,
  ])
  const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal])

  const handleAddTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newTaskInput || !newTaskType) return

    addNewTask(newTaskInput, newTaskType.id)

    closeModal()
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog className="relative top-[-300px] z-10" as="form" onSubmit={handleAddTaskSubmit} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="insert-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#06bfe2] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="pb-2 text-lg font-medium leading-6 text-gray-900">
                  Add a task
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a new task here ..."
                    className="w-full rounded-md border border-gray-300 p-5 outline-none"
                  />
                </div>

                <TaskTypeRadioGroup />

                <button
                  type="submit"
                  disabled={!newTaskInput || !newTaskType}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                >
                  Add Task
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
