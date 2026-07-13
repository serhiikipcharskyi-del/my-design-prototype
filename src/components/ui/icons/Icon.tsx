import { icons } from './icons-data'

export interface IconProps {
  /** Icon name from the design system (e.g. "ic-add", "arrow-simple-right") */
  name: string
  /**
   * Rendered size in px. Drives stroke-width automatically:
   *   ≥ 24 px → 1.6 px  |  ≥ 20 px → 1.4 px  |  < 20 px → 1.2 px
   * @default 24
   */
  size?: number
  className?: string
  style?: React.CSSProperties
}

const svgString = (name: string) => icons.find(i => i.name === name)?.svg ?? ''

const iconStroke = (size: number): string => {
  if (size >= 24) return 'var(--icon-stroke-24)'
  if (size >= 20) return 'var(--icon-stroke-20)'
  return 'var(--icon-stroke-16)'
}

export const Icon = ({ name, size = 24, className, style }: IconProps) => (
  <span
    data-icon
    className={className}
    style={
      {
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        '--icon-stroke': iconStroke(size),
        ...style,
      } as React.CSSProperties
    }
    dangerouslySetInnerHTML={{ __html: svgString(name) }}
    aria-hidden="true"
  />
)
