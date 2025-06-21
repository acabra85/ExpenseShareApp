import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({ children, onClick, type = 'button', className = '' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-md transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
