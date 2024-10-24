import { ChevronDown } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: Array<SelectOption>
  placeholder?: string
  className?: string
}

export const Select: FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = 'Select option',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
                value === option.value
                  ? 'bg-gray-50 text-primary-600'
                  : 'text-gray-900'
              }`}
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
