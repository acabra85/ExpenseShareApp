import React from 'react';

interface MessageDisplayProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const MessageDisplay = ({ message, type }: MessageDisplayProps) => {
  const baseClasses = "p-3 rounded-md text-sm mb-4";
  const typeClasses = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}>
      {message}
    </div>
  );
};

export default MessageDisplay;
