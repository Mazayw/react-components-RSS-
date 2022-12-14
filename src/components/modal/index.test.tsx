import Card from '.';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IResponseCard } from 'components/interfaces';
import cardData from './card-data';

describe('Card', () => {
  it('Card render', () => {
    render(
      <Card
        cardData={cardData as IResponseCard}
        handleCloseModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(screen.getByText(/location/i)).toBeInTheDocument();
    expect(screen.getByText(/Origin/i)).toBeInTheDocument();
    expect(screen.getByText(/Species/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
