import * as React from 'react'
import { clsx } from 'clsx'
import { Illustration } from './illustration'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UploadFieldProps {
  onFilesSelected: (files: File[]) => void
  /** Native <input accept> filter, e.g. "image/*" or ".pdf,.docx" */
  accept?: string
  multiple?: boolean
  /** Shown in the "Max file size" hint — purely informational, not enforced here */
  maxSizeMB?: number
  disabled?: boolean
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 3398:62458, "UploadField"):
//   432px, dashed border, rounded-lg (12px), px-4 py-6, gap-4
//   Default  border-orchid-200
//   Hover    border-orchid-400 + bg-orchid-50
//   Active (drag-over) border-orchid-400 + bg-grey-100 — takes priority over hover
//   Illustration_Upload_file (48px) + "Upload file (underlined) or drag and
//   drop here" + "Max file size: {N}MB"
//
//   Real drag-and-drop + click-to-browse via a hidden native file input —
//   Figma's separate hover/active props were just static snapshots of the
//   same interactive states.

export const UploadField = React.forwardRef<HTMLInputElement, UploadFieldProps>(
  ({ onFilesSelected, accept, multiple = false, maxSizeMB = 50, disabled = false, className }, ref) => {
    const [isDragActive, setIsDragActive] = React.useState(false)
    const dragDepth = React.useRef(0)

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      onFilesSelected(Array.from(fileList))
    }

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault()
      dragDepth.current += 1
      setIsDragActive(true)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      dragDepth.current -= 1
      if (dragDepth.current <= 0) {
        dragDepth.current = 0
        setIsDragActive(false)
      }
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      dragDepth.current = 0
      setIsDragActive(false)
      if (disabled) return
      handleFiles(e.dataTransfer.files)
    }

    return (
      <label
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          'flex w-full max-w-[432px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed px-4 py-6 outline-none transition-colors duration-100',
          disabled
            ? 'cursor-not-allowed border-grey-200 opacity-50'
            : clsx(
                'cursor-pointer',
                isDragActive
                  ? 'border-orchid-400 bg-grey-100'
                  : 'border-orchid-200 hover:border-orchid-400 hover:bg-orchid-50',
              ),
          className,
        )}
      >
        <input
          ref={ref}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={e => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />

        <Illustration name="upload-file" size={48} />

        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-center font-sans text-h5 font-semibold text-grey-1000">
            <span className="underline">Upload file</span> or drag and drop here
          </p>
          <p className="text-center font-sans text-body-s font-medium text-grey-900">
            Max file size: <span className="font-semibold text-grey-1000">{maxSizeMB}MB</span>
          </p>
        </div>
      </label>
    )
  },
)

UploadField.displayName = 'UploadField'
