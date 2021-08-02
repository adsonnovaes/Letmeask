import { ButtonHTMLAttributes } from 'react';

import '../styles/components/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
  isConfirmed?: boolean
};

export function Button({ isOutlined = false, isConfirmed = false,...props}: ButtonProps) {
  return (
    <button 
      className={
        `button ${isOutlined ? 'outlined' : ''} ${isConfirmed ? 'confirmed' : ''}`
      } 
      {...props} 
    />
  );
}