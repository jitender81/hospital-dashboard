import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ label = 'Loading healthcare details...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-400">
      <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-3" />
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
};

export default Loading;