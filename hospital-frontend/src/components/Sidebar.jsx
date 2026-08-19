import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  UserCheck,
  FileText,
  Pill,
  User,
  Users,
  CreditCard,
  Activity,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logout } = useAuth();

  const getNavigation = () => {
    switch (user?.role) {
      case 'patient':
        return [
          { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
          { name: 'Appointments', path: '/patient/appointments', icon: Calendar },
          { name: 'Doctors', path: '/patient/doctors', icon: UserCheck },
          { name: 'Medical Records', path: '/patient/medical-records', icon: FileText },
          { name: 'Prescriptions', path: '/patient/prescriptions', icon: Pill },
          { name: 'Profile', path: '/patient/profile', icon: User }
        ];
      case 'doctor':
        return [
          { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
          { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
          { name: 'Patients', path: '/doctor/patients', icon: Users },
          { name: 'Medical Records', path: '/doctor/medical-records', icon: FileText },
          { name: 'Prescriptions', path: '/doctor/prescriptions', icon: Pill },
          { name: 'Profile', path: '/doctor/profile', icon: User }
        ];
      case 'reception':
        return [
          { name: 'Dashboard', path: '/reception/dashboard', icon: LayoutDashboard },
          { name: 'Patients', path: '/reception/patients', icon: Users },
          { name: 'Doctors', path: '/reception/doctors', icon: UserCheck },
          { name: 'Appointments', path: '/reception/appointments', icon: Calendar },
          { name: 'Billing', path: '/reception/billing', icon: CreditCard },
          { name: 'Profile', path: '/reception/profile', icon: User }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavigation();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 md:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          <div className="h-16 flex items-center gap-3 px-6 bg-slate-950 border-b border-slate-800">
            <div className="p-2 bg-teal-500 text-white rounded-lg">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-white tracking-wide">PulseHealth</span>
          </div>

          <div className="px-4 py-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3 mb-3">
              {user?.role} Portal
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;