import React, { PropsWithChildren } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';

export function CollapsableTableHeader({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = React.useState(true);
  const Icon = collapsed ? ChevronRight : ChevronDown;

  return (
    <div onClick={() => setCollapsed(!collapsed)} className="ml-1 flex flex-row items-center">
      <Icon size={15} className="absolute left-2 text-gray-300" />
      {children}
    </div>
  );
}
