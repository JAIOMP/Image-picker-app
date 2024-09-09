import React from 'react';
import Field from './Field';
import { render, screen, fireEvent } from "@testing-library/react";
import { mockCma, mockSdk } from '../../test/mocks';

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
}));

describe('Field component', () => {
  test('renders the Pick image button', () => {
    render(<Field />);
    
    const button = screen.getByText('Pick image');
    expect(button).toBeInTheDocument();
  });

  test('opens dialog and selects image', async () => {
    const mockImage = {
      id: 1,
      tags: 'Nature',
      previewURL: 'https://example.com/nature.jpg',
    };
    
    mockSdk.dialogs.openCurrentApp.mockResolvedValueOnce({
      image: mockImage,
    });

    render(<Field />);

    const button = screen.getByText('Pick image');
    
    fireEvent.click(button);

    const imageCard = await screen.findByText('Nature');
    
    expect(imageCard).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockImage.previewURL);
  });

  test('removes selected image', async () => {
    const mockImage = {
      id: 1,
      tags: 'Nature',
      previewURL: 'https://example.com/nature.jpg',
    };

    mockSdk.dialogs.openCurrentApp.mockResolvedValueOnce({
      image: mockImage,
    });

    render(<Field />);

    const button = screen.getByText('Pick image');
    
    fireEvent.click(button);
    const imageCard = await screen.findByText('Nature');
    
    expect(imageCard).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /remove image/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText('Nature')).not.toBeInTheDocument();
  });
});
