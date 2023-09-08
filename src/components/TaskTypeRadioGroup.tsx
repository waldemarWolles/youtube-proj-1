import React from 'react'

import { RadioGroup } from '@headlessui/react'
import { useBoardStore } from '@/store/TaskBoardStore.ts'
import { types } from '@/helpers/taskTypesRadioData.ts'

const TaskTypeRadioGroup: React.FC = () => {
  const [newTaskType, setNewTaskType] = useBoardStore((state) => [state.newTaskType, state.setNewTaskType])

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={setNewTaskType}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.name}
                value={type}
                className={({ active, checked }) =>
                  `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : ''}
                  ${checked ? `${type.color} bg-opacity-75 text-white` : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}>
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description as="span" className={`inline ${checked ? 'text-white' : 'text-gray-500'}`}>
                            <span>{type.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.5" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default TaskTypeRadioGroup
