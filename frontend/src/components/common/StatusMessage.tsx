'use client';

import { ReactNode } from 'react';

import LoadingSpinner from './LoadingSpinner';

type StatusType = 'loading' | 'error' | 'empty';

interface StatusMessageProps {
  status: StatusType;
  message?: string;
  icon?: ReactNode;
  className?: string;
}

const STATUS_MESSAGES = {
  loading: '데이터를 불러오는 중...',
  error: '데이터를 불러오는 중 오류가 발생했습니다.',
  empty: '데이터를 찾을 수 없습니다.',
};

const StatusMessage = ({ status, message, icon, className = '' }: StatusMessageProps) => {
  const defaultMessage = STATUS_MESSAGES[status] || '';
  const displayMessage = message || defaultMessage;

  const getColorClass = () => {
    switch (status) {
      case 'error':
        return 'text-red-500';
      case 'empty':
        return 'text-gray-500';
      default:
        return '';
    }
  };

  const colorClass = getColorClass();

  return (
    <div className={`flex h-full items-center justify-center ${colorClass} ${className}`}>
      {status === 'loading' && !icon && <LoadingSpinner />}
      {icon && <div className="mr-2">{icon}</div>}
      {status === 'loading' && !icon && <div className="ml-2">{displayMessage}</div>}
      {(status !== 'loading' || icon) && <div>{displayMessage}</div>}
    </div>
  );
};

export default StatusMessage;
