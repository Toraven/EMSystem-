export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getDaysUntilDue = (dueDateString: string): number => {
  const dueDate = new Date(dueDateString);
  const now = new Date();
  const diffTime = dueDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isOverdue = (dueDateString: string): boolean => {
  return getDaysUntilDue(dueDateString) < 0;
};

export const isDueSoon = (dueDateString: string, leadTimeDays: number = 14): boolean => {
  const days = getDaysUntilDue(dueDateString);
  return days <= leadTimeDays && days >= 0;
};