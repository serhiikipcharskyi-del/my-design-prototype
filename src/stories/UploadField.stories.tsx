import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { UploadField } from '../components/ui/upload-field'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/UploadField',
  component: UploadField,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    onFilesSelected: () => {},
  },
} satisfies Meta<typeof UploadField>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground — Figma reference ─────────────────────────────────────────────
// Matches the Figma component sheet (node 3398:62458). Hover, drag a file
// over it, or click to browse — all real, not static props.

function PlaygroundDemo() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="flex w-[432px] flex-col gap-3">
      <UploadField onFilesSelected={f => setFiles(prev => [...prev, ...f])} />
      {files.length > 0 && (
        <ul className="flex flex-col gap-1 rounded-lg bg-grey-50 p-3 text-body-s text-grey-900">
          {files.map((f, i) => (
            <li key={i}>
              {f.name} — {(f.size / 1024).toFixed(1)} KB
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
}

// ─── Restricted to images, single file ────────────────────────────────────────

function ImageOnlyDemo() {
  const [file, setFile] = useState<File | null>(null)
  return (
    <div className="flex w-[432px] flex-col gap-3">
      <UploadField
        accept="image/*"
        maxSizeMB={10}
        onFilesSelected={f => setFile(f[0] ?? null)}
      />
      {file && (
        <p className="text-body-s text-grey-900">Selected: {file.name}</p>
      )}
    </div>
  )
}

export const ImagesOnly: Story = {
  name: 'Images only',
  render: () => <ImageOnlyDemo />,
}

// ─── Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true },
  render: args => (
    <div className="w-[432px]">
      <UploadField {...args} />
    </div>
  ),
}
