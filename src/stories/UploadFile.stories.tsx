import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useEffect, useState } from 'react'
import { UploadFile } from '../components/ui/upload-file'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/UploadFile',
  component: UploadFile,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    name: 'Application Form',
    size: '2.1MB',
    progress: 40,
  },
} satisfies Meta<typeof UploadFile>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: args => <UploadFile {...args} onRemove={() => {}} />,
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 3398:62424): the same bar at 1%,
// 100%, and a failed upload — driven by real `progress`/`status`, not
// separate static variants.

export const States: Story = {
  render: () => (
    <div className="flex w-[432px] flex-col gap-3">
      <UploadFile name="Application Form" size="2.1MB" progress={1} onRemove={() => {}} />
      <UploadFile
        name="Application Form"
        size="2.1MB"
        progress={100}
        status="success"
        onRemove={() => {}}
      />
      <UploadFile
        name="How to Build a Rocket"
        size="64 MB"
        progress={100}
        status="error"
        errorMessage="Upload failed, file is too large."
        onRetry={() => {}}
        onRemove={() => {}}
      />
    </div>
  ),
}

// ─── File types ───────────────────────────────────────────────────────────────
// The icon resolves from `fileType`, or is sniffed from `name`'s extension
// when omitted — falling back to a generic glyph for unrecognized types.

export const FileTypes: Story = {
  name: 'File types',
  render: () => (
    <div className="flex w-[432px] flex-col gap-3">
      <UploadFile name="Customers.csv" size="340KB" progress={100} status="success" onRemove={() => {}} />
      <UploadFile name="Contract.doc" size="1.2MB" progress={100} status="success" onRemove={() => {}} />
      <UploadFile name="Team Photo.jpg" size="4.8MB" progress={100} status="success" onRemove={() => {}} />
      <UploadFile name="README.md" size="4KB" progress={100} status="success" onRemove={() => {}} />
      <UploadFile name="Invoice.pdf" size="820KB" progress={100} status="success" onRemove={() => {}} />
      <UploadFile name="Budget.xls" size="2.4MB" progress={100} status="success" onRemove={() => {}} />
      <UploadFile name="Unknown Format" size="1MB" progress={100} status="success" onRemove={() => {}} />
    </div>
  ),
}

// ─── Live upload — actually progresses ─────────────────────────────────────────
// A real upload simulation: progress ticks up over time and can fail/retry.

function LiveUploadDemo() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'uploading' | 'success' | 'error'>('uploading')
  const [removed, setRemoved] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (status !== 'uploading') return
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 12
        if (next >= 100) {
          clearInterval(interval)
          // Fail once on the first attempt, to demonstrate retry.
          setStatus(attempt === 0 ? 'error' : 'success')
          return 100
        }
        return next
      })
    }, 250)
    return () => clearInterval(interval)
  }, [status, attempt])

  if (removed) {
    return <p className="text-body-m text-grey-900">File removed.</p>
  }

  return (
    <div className="w-[432px]">
      <UploadFile
        name="Quarterly Report"
        size="8.4MB"
        progress={progress}
        status={status}
        errorMessage="Upload failed, connection lost."
        onRemove={() => setRemoved(true)}
        onRetry={() => {
          setAttempt(a => a + 1)
          setProgress(0)
          setStatus('uploading')
        }}
      />
    </div>
  )
}

export const LiveUpload: Story = {
  name: 'Live upload',
  render: () => <LiveUploadDemo />,
}
