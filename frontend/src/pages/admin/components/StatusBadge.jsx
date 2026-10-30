import React from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
  HelpCircle,
  UserCheck
} from 'lucide-react';

export default function StatusBadge({ status }) {
  const normalized = (status || 'New').trim();

  let className = 'status-new';
  let Icon = Sparkles;

  switch (normalized) {
    case 'New':
      className = 'status-new';
      Icon = Sparkles;
      break;
    case 'Under Review':
      className = 'status-under-review';
      Icon = Clock;
      break;
    case 'Awaiting Customer Response':
      className = 'status-awaiting-customer-response';
      Icon = HelpCircle;
      break;
    case 'Awaiting Panditji Confirmation':
      className = 'status-awaiting-panditji-confirmation';
      Icon = UserCheck;
      break;
    case 'Confirmed':
      className = 'status-confirmed';
      Icon = CheckCircle2;
      break;
    case 'Completed':
      className = 'status-completed';
      Icon = CheckCircle2;
      break;
    case 'Cancelled':
      className = 'status-cancelled';
      Icon = XCircle;
      break;
    default:
      className = 'status-under-review';
      Icon = Clock;
  }

  return (
    <span className={`status-badge ${className}`}>
      <Icon size={13} />
      <span>{normalized}</span>
    </span>
  );
}

