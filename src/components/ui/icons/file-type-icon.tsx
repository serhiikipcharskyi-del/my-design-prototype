import * as React from 'react'
import { clsx } from 'clsx'
import csvIcon from './file-types/file-type-csv.svg'
import docIcon from './file-types/file-type-doc.svg'
import jpgIcon from './file-types/file-type-jpg.svg'
import mdIcon from './file-types/file-type-md.svg'
import pdfIcon from './file-types/file-type-pdf.svg'
import xlsIcon from './file-types/file-type-xls.svg'

// ─── Types ────────────────────────────────────────────────────────────────────

export type FileType = 'csv' | 'doc' | 'jpg' | 'md' | 'pdf' | 'xls'

export interface FileTypeIconProps {
  type: FileType
  /** Size of the (square) bounding box — the icon centers and scales to fit inside it */
  size?: number
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// File-type glyphs exported directly from Figma. csv/jpg are narrower
// (14×18 native) than doc/md/pdf/xls (24×24) — matching the source icon set,
// but that means scaling each to a shared target height (the old approach)
// left csv/jpg visibly narrower than the rest. Figma places all of them in a
// uniform 40×40 slot instead, so the wrapper here is always a fixed square
// (`size`, default 40) with the glyph centered and scaled to fit inside it,
// keeping every file type the same footprint in a list like UploadFile.

const sources: Record<FileType, { src: string; width: number; height: number }> = {
  csv: csvIcon,
  doc: docIcon,
  jpg: jpgIcon,
  md: mdIcon,
  pdf: pdfIcon,
  xls: xlsIcon,
}

export const FileTypeIcon = React.forwardRef<HTMLSpanElement, FileTypeIconProps>(
  ({ type, size = 40, className }, ref) => {
    const asset = sources[type]

    return (
      <span
        ref={ref}
        className={clsx('inline-flex shrink-0 items-center justify-center', className)}
        style={{ width: size, height: size }}
      >
        <img
          src={asset.src}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          alt=""
          aria-hidden="true"
        />
      </span>
    )
  },
)

FileTypeIcon.displayName = 'FileTypeIcon'

// ─── Extension lookup ───────────────────────────────────────────────────────

const EXTENSION_MAP: Record<string, FileType> = {
  csv: 'csv',
  doc: 'doc',
  docx: 'doc',
  jpg: 'jpg',
  jpeg: 'jpg',
  png: 'jpg',
  gif: 'jpg',
  webp: 'jpg',
  md: 'md',
  markdown: 'md',
  pdf: 'pdf',
  xls: 'xls',
  xlsx: 'xls',
}

/** Maps a filename's extension to a known FileType, or undefined if unrecognized. */
export function getFileType(filename: string): FileType | undefined {
  const ext = filename.split('.').pop()?.toLowerCase()
  return ext ? EXTENSION_MAP[ext] : undefined
}
