import React from 'react';

const colorClasses = {
  teal: 'bg-teal-50 text-teal-600 border-teal-200',
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  amber: 'bg-amber-50 text-amber-600 border-amber-200',
  red: 'bg-red-50 text-red-600 border-red-200',
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
};

const StatCard = ({ title, value, icon: Icon, color = 'blue', description }) => {
  const classes = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className="text-xl font-bold text-slate-800 mt-1">{value}</p>
          {description && (
            <p className="text-[11px] text-slate-400 mt-1">{description}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-2 rounded-lg border ${classes}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;