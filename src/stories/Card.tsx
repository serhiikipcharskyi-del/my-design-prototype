export interface CardProps {
  title: string;
  description: string;
  tag?: string;
  tagVariant?: 'teal' | 'yellow' | 'green' | 'pink' | 'red';
  avatarColor?: string;
  assignee?: string;
}

const tagStyles: Record<NonNullable<CardProps['tagVariant']>, string> = {
  teal:   'bg-tag-teal-100   text-tag-teal-300',
  yellow: 'bg-tag-yellow-100 text-tag-yellow-900',
  green:  'bg-tag-green-600  text-tag-green-900',
  pink:   'bg-tag-pink-600   text-tag-pink-900',
  red:    'bg-tag-red-600    text-tag-red-900',
};

export const Card = ({
  title,
  description,
  tag,
  tagVariant = 'teal',
  avatarColor = '#c95bc1',
  assignee = 'AK',
}: CardProps) => {
  return (
    <div className="bg-white rounded-card shadow-s p-6 flex flex-col gap-4 w-80">
      {/* Header */}
      <div className="flex items-center justify-between">
        {tag && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-sm text-body-xs font-semibold ${tagStyles[tagVariant]}`}
          >
            {tag}
          </span>
        )}
        {/* Avatar */}
        <span
          className="ml-auto flex h-6 w-6 items-center justify-center rounded-full text-body-xs font-semibold text-white"
          style={{ backgroundColor: avatarColor }}
        >
          {assignee.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        <h3 className="text-h5 font-semibold text-grey-1000">{title}</h3>
        <p className="text-body-m text-grey-900">{description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 pt-2 border-t border-grey-200">
        <span className="text-body-xs text-grey-800">In progress</span>
        <span className="ml-auto h-1.5 w-24 rounded-full bg-grey-200 overflow-hidden">
          <span className="block h-full w-2/3 rounded-full bg-orchid-1000" />
        </span>
      </div>
    </div>
  );
};
