import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'No records found', description = 'There are no active entries available right now.', action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-dashed border-slate-300 text-center">
      <div className="p-3 bg-slate-100 rounded-full text-slate-400 mb-3">
        <Inbox className="h-6 w-6" />
      </div>
      <h4 className="font-semibold text-slate-800 text-base">{title}</h4>
      <p className="text-xs text-slate-500 max-w-xs mt-1">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;