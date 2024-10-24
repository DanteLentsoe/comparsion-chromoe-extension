import React, { useState, useEffect, useRef } from 'react'

import { ArrowRightLeft, ChevronDown, Copy, Save, Trash2 } from 'lucide-react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@radix-ui/react-select'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}

export const Select: React.FC<SelectProps> = ({
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

// Simple Button component
const Button: React.FC<{
  variant?: 'outline' | 'default'
  size?: 'sm' | 'default'
  onClick?: () => void
  children: React.ReactNode
  className?: string
}> = ({
  variant = 'default',
  size = 'default',
  onClick,
  children,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`
      ${
        variant === 'outline'
          ? 'border border-gray-300 bg-white'
          : 'bg-blue-600 text-white'
      }
      ${size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2'}
      rounded-md hover:opacity-90 transition-opacity
      flex items-center justify-center
      ${className}
    `}
  >
    {children}
  </button>
)

// Simple Card wrapper components
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
)

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-6 py-4 border-b">{children}</div>
)

const CardTitle: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className = '', children }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
)

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6">{children}</div>
)

export type HighLightDiffType = {
  left: Array<number>
  right: Array<number>
}

export type SavedComparisonsType = {
  id: number
  leftText: string
  rightText: string
  format: string
  date: string
}
export const DiffViewer = () => {
  const [leftText, setLeftText] = useState('')
  const [rightText, setRightText] = useState('')
  const [format, setFormat] = useState('text')
  const [savedComparisons, setSavedComparisons] = useState<
    Array<SavedComparisonsType>
  >([])
  const [showValidation, setShowValidation] = useState<boolean>(false)
  const [highlightedDiffs, setHighlightedDiffs] = useState<HighLightDiffType>({
    left: [],
    right: [],
  })

  useEffect(() => {
    // Load saved comparisons from localStorage
    const saved = localStorage.getItem('savedComparisons')
    if (saved) {
      setSavedComparisons(JSON.parse(saved))
    }
  }, [])

  // Format options for the select
  const formatOptions = [
    { value: 'text', label: 'Plain Text' },
    { value: 'json', label: 'JSON' },
    { value: 'sql', label: 'SQL' },
  ]

  const formatText = (text: string, format: string) => {
    try {
      switch (format) {
        case 'json':
          return JSON.stringify(JSON.parse(text), null, 2)
        case 'sql':
          // Basic SQL formatting - could be enhanced
          return text
            .replace(/\s+/g, ' ')
            .replace(
              /(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING)/gi,
              '\n$1',
            )
            .trim()
        default:
          return text
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
      return text
    }
  }
  // Add these utility functions at the top of your component
  const isTextEmpty = (text: string): boolean => {
    return !text || text.trim().length === 0
  }

  const saveComparison = () => {
    const newComparison = {
      id: Date.now(),
      leftText,
      rightText,
      format,
      date: new Date().toISOString(),
    }

    const updatedComparisons = [...savedComparisons, newComparison]
    setSavedComparisons(updatedComparisons)
    localStorage.setItem('savedComparisons', JSON.stringify(updatedComparisons))
  }

  const loadComparison = (comparison: SavedComparisonsType) => {
    setLeftText(comparison.leftText)
    setRightText(comparison.rightText)
    setFormat(comparison.format)
  }

  const deleteComparison = (id: number) => {
    const updatedComparisons = savedComparisons.filter((c) => c.id !== id)
    setSavedComparisons(updatedComparisons)
    localStorage.setItem('savedComparisons', JSON.stringify(updatedComparisons))
  }

  const handleLeftTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLeftText(e.target.value)
    if (
      showValidation &&
      !isTextEmpty(e.target.value) &&
      !isTextEmpty(rightText)
    ) {
      setShowValidation(false)
    }
  }

  const handleRightTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRightText(e.target.value)
    if (
      showValidation &&
      !isTextEmpty(leftText) &&
      !isTextEmpty(e.target.value)
    ) {
      setShowValidation(false)
    }
  }

  const findDifferences = () => {
    setShowValidation(true)

    if (isTextEmpty(leftText) || isTextEmpty(rightText)) {
      return
    }

    const leftLines = leftText.split('\n')
    const rightLines = rightText.split('\n')

    const leftDiffs: number[] = []
    const rightDiffs: number[] = []

    const maxLines = Math.max(leftLines.length, rightLines.length)

    for (let i = 0; i < maxLines; i++) {
      if (leftLines[i] !== rightLines[i]) {
        leftDiffs.push(i)
        rightDiffs.push(i)
      }
    }

    setHighlightedDiffs({ left: leftDiffs, right: rightDiffs })
  }

  return (
    <div
      className="p-4 max-w-7xl w-96 mx-auto"
      style={{
        width: 600,
      }}
    >
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Text Comparison Tool</span>
            <div className="flex gap-2">
              <Select
                value={format}
                onValueChange={setFormat}
                options={formatOptions}
                placeholder="Format"
                className="w-32"
              />

              <Button variant="outline" size="sm" onClick={saveComparison}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <textarea
                className={`w-full h-96 p-2 font-mono text-sm border rounded
        ${
          showValidation && isTextEmpty(leftText)
            ? 'border-red-300'
            : 'border-gray-300'
        }
        focus:outline-none focus:ring-2 
        ${
          showValidation && isTextEmpty(leftText)
            ? 'focus:ring-red-500'
            : 'focus:ring-primary-500'
        }
      `}
                value={leftText}
                onChange={handleLeftTextChange}
                placeholder="Enter first text..."
              />
            </div>
            <div>
              <textarea
                className={`w-full h-96 p-2 font-mono text-sm border rounded
        ${
          showValidation && isTextEmpty(rightText)
            ? 'border-red-300'
            : 'border-gray-300'
        }
        focus:outline-none focus:ring-2 
        ${
          showValidation && isTextEmpty(rightText)
            ? 'focus:ring-red-500'
            : 'focus:ring-primary-500'
        }
      `}
                value={rightText}
                onChange={handleRightTextChange}
                placeholder="Enter second text..."
              />
            </div>
          </div>

          {showValidation && (isTextEmpty(leftText) || isTextEmpty(rightText)) && (
            <div className="flex items-center justify-center mt-4 mb-2">
              <span className="text-sm text-red-500 flex items-center gap-2 bg-red-50 px-3 py-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {isTextEmpty(leftText) && isTextEmpty(rightText)
                  ? 'Both fields are empty'
                  : isTextEmpty(leftText)
                  ? 'Left field is empty'
                  : 'Right field is empty'}
              </span>
            </div>
          )}

          <Button
            onClick={findDifferences}
            className="w-full mt-4 bg-gradient-to-r from-primary-600 to-primary-500 
             hover:from-primary-700 hover:to-primary-600 
             text-white font-medium px-8 py-2 rounded-lg 
             transform transition-all duration-200 
             shadow-lg hover:shadow-xl 
             border border-primary-400 
             flex items-center justify-center gap-2 
             text-lg focus:outline-none focus:ring-2 
             focus:ring-primary-500 focus:ring-offset-2"
          >
            <ArrowRightLeft className="w-5 h-5" />
            Compare
          </Button>
        </CardContent>
      </Card>

      {/* Difference Display */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Differences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {formatText(leftText, format)
                .split('\n')
                .map(
                  (
                    line:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<unknown>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined,
                    idx: React.Key | null | undefined,
                  ) => (
                    <div
                      key={idx}
                      className={`font-mono text-sm ${
                        highlightedDiffs.left.includes(idx as never)
                          ? 'bg-red-100'
                          : ''
                      }`}
                    >
                      {line}
                    </div>
                  ),
                )}
            </div>
            <div>
              {formatText(rightText, format)
                .split('\n')
                .map(
                  (
                    line:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<unknown>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined,
                    idx: React.Key | null | undefined,
                  ) => (
                    <div
                      key={idx}
                      className={`font-mono text-sm ${
                        highlightedDiffs.right.includes(idx as never)
                          ? 'bg-green-100'
                          : ''
                      }`}
                    >
                      {line}
                    </div>
                  ),
                )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Comparisons */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Comparisons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {savedComparisons.map((comparison) => (
              <div
                key={comparison?.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <span className="text-sm">
                  {new Date(comparison.date).toLocaleString()} -{' '}
                  {comparison.format}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadComparison(comparison)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Load
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteComparison(comparison.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
