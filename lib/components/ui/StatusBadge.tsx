'use client';

interface StatusBadgeProps {
  isActive: boolean;
  activeText: string;
  inactiveText: string;
}

const StatusBadge = ({ isActive, activeText, inactiveText }: StatusBadgeProps) => {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isActive ? activeText : inactiveText}
    </span>
  );
};

export default StatusBadge;
