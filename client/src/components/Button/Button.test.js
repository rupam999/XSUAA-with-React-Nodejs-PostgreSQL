/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '.';

describe('Button Component', () => {
  test('should render button properly', () => {
    render(<Button />);

    const btnComponent = screen.getByRole('button');
    expect(btnComponent).toBeInTheDocument();
  });
});
