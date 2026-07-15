import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'
import { GenericFileIcon } from './icons/pictograms'
import { FileTypeIcon, getFileType, type FileType } from './icons/file-type-icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type UploadFileStatus = 'uploading' | 'success' | 'error'

export interface UploadFileProps {
  name: string
  /** Formatted file size, e.g. "2.1MB" */
  size: string
  /** 0–100 */
  progress: number
  status?: UploadFileStatus
  errorMessage?: string
  /**
   * Explicit file type icon (csv/doc/jpg/md/pdf/xls). If omitted, it's
   * inferred from `name`'s extension; falls back to a generic file glyph
   * when neither is given or the extension isn't recognized.
   */
  fileType?: FileType
  /** Fully overrides the icon — takes priority over `fileType` */
  icon?: React.ReactNode
  onRemove?: () => void
  onRetry?: () => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 3398:62424, "UploadFile"):
//   432px card, border-grey-200, rounded-md (8px), p-3, gap-2
//   File icon (40px) + name (14px/Semi Bold) + size (13px/grey-900)
//   Progress bar: track bg-grey-200, fill tag-green-700 (uploading/success)
//     or danger (error) — driven by real `progress` (0–100), not static states
//   Error adds a retry action + red error message below the name row
//
//   Figma's Start/Loaded/Error "states" were just snapshots of one real
//   progress bar at 1%, 100%, and a failed upload — so this component takes
//   an actual `progress` number and `status`, not separate static variants.
//
//   Icon resolves in order: explicit `icon` → `fileType` → sniffed from
//   `name`'s extension → generic fallback (see icons/file-type-icon.tsx).

export const UploadFile = React.forwardRef<HTMLDivElement, UploadFileProps>(
  (
    {
      name,
      size,
      progress,
      status = 'uploading',
      errorMessage,
      fileType,
      icon,
      onRemove,
      onRetry,
      className,
    },
    ref,
  ) => {
    const isError = status === 'error'
    const clampedProgress = Math.min(100, Math.max(0, progress))
    const resolvedType = fileType ?? getFileType(name)

    return (
      <div
        ref={ref}
        className={clsx(
          'flex w-full max-w-[432px] items-start gap-3 rounded-md border border-grey-200 bg-white p-3',
          className,
        )}
      >
        {icon ??
          (resolvedType ? (
            <FileTypeIcon type={resolvedType} size={40} />
          ) : (
            <GenericFileIcon size={40} />
          ))}

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
              <span className="shrink-0 font-sans text-h5 font-semibold text-grey-1000">
                {name}
              </span>
              <span className="shrink-0 font-sans text-body-m text-grey-900">•</span>
              <span className="min-w-0 font-sans text-body-m text-grey-900">{size}</span>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {isError && onRetry && (
                <button
                  type="button"
                  aria-label="Retry upload"
                  onClick={onRetry}
                  className="flex items-center justify-center rounded-sm p-0.5 text-grey-1000 outline-none hover:bg-grey-100 focus-visible:ring-2 focus-visible:ring-orchid-1000"
                >
                  <Icon name="ic-reps" size={16} />
                </button>
              )}
              {onRemove && (
                <button
                  type="button"
                  aria-label="Remove file"
                  onClick={onRemove}
                  className="flex items-center justify-center rounded-sm p-0.5 text-grey-1000 outline-none hover:bg-grey-100 focus-visible:ring-2 focus-visible:ring-orchid-1000"
                >
                  <Icon name="ic-close" size={16} />
                </button>
              )}
            </div>
          </div>

          {isError && errorMessage && (
            <span className="font-sans text-body-s font-semibold text-danger">
              {errorMessage}
            </span>
          )}

          <div
            role="progressbar"
            aria-valuenow={clampedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 w-full overflow-hidden rounded-sm bg-grey-200"
          >
            <div
              className={clsx(
                'h-full rounded-sm transition-[width] duration-300',
                isError ? 'bg-danger' : 'bg-[#0f946b]',
              )}
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
        </div>
      </div>
    )
  },
)

UploadFile.displayName = 'UploadFile'
