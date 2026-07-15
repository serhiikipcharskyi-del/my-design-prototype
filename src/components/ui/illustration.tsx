import * as React from 'react'
import illustrationUploadFile from './illustrations/illustration-upload-file.svg'
import illustrationUploadImage from './illustrations/illustration-upload-image.svg'
import illustrationImage from './illustrations/illustration-image.svg'
import illustrationProcess from './illustrations/illustration-process.svg'
import illustrationForm from './illustrations/illustration-form.svg'
import illustrationFormDone from './illustrations/illustration-form-done.svg'
import illustrationTeam from './illustrations/illustration-team.svg'
import illustrationMember from './illustrations/illustration-member.svg'

// ─── Types ────────────────────────────────────────────────────────────────────

export type IllustrationName =
  | 'upload-file'
  | 'upload-image'
  | 'image'
  | 'process'
  | 'form'
  | 'form-done'
  | 'team'
  | 'member'

export interface IllustrationProps {
  name: IllustrationName
  /**
   * Target width in px — height scales to match the asset's native aspect
   * ratio (most are ~square, but exported canvases include a little extra
   * bleed for drop shadows so a few aren't exactly 1:1). Omit for native size.
   */
  size?: number
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 5599:7368, "Illustrations"): decorative multi-color SVG
// illustrations used in empty states and upload placeholders — exported
// directly from Figma (see src/components/ui/illustrations/*.svg).

const sources: Record<IllustrationName, { src: string; width: number; height: number }> = {
  'upload-file': illustrationUploadFile,
  'upload-image': illustrationUploadImage,
  image: illustrationImage,
  process: illustrationProcess,
  form: illustrationForm,
  'form-done': illustrationFormDone,
  team: illustrationTeam,
  member: illustrationMember,
}

export const Illustration = React.forwardRef<HTMLImageElement, IllustrationProps>(
  ({ name, size, className }, ref) => {
    const asset = sources[name]
    const scale = size ? size / asset.width : 1
    const width = size ?? asset.width
    const height = asset.height * scale

    return (
      <img
        ref={ref}
        src={asset.src}
        width={width}
        height={height}
        className={className}
        alt=""
        aria-hidden="true"
      />
    )
  },
)

Illustration.displayName = 'Illustration'
