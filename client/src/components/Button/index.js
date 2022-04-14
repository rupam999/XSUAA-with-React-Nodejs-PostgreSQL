import React from 'react';
import Classes from './Button.module.css';

const Button = (props) => {
  const { onClick, children } = props;
  return (
    <button type="button" className={Classes.baseClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
