import React, { PropsWithChildren } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

export function SortableTableHeader({ children }: PropsWithChildren) {
  const [direction, setDirection] = React.useState('desc');
  const Icon = direction === 'desc' ? ChevronDown : ChevronUp;

  return (
    <div
      onClick={() => setDirection(direction === 'desc' ? 'asc' : 'desc')}
      className="flex cursor-pointer flex-row items-center justify-end gap-2"
    >
      <Icon size={15} className="text-gray-300" /> {children}
    </div>
  );
}
