import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImagePickerDialog from "./Dialog";
import { DialogAppSDK } from "@contentful/app-sdk";

global.fetch = jest.fn();

const mockSdk: DialogAppSDK = {
  parameters: {
    invocation: {
      apiUrl: "https://pixabay.com/api/?key=API_KEY",
    },
  },
  close: jest.fn(),
} as any;

const mockImages = [
  {
    id: 1,
    previewURL: "https://example.com/image1.jpg",
    tags: "Nature, Forest",
    imageId: "1633052800000",
  },
  {
    id: 2,
    previewURL: "https://example.com/image2.jpg",
    tags: "Ocean, Beach",
  },
];

describe("ImagePickerDialog", () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1633052800000);
    jest.clearAllMocks();
  });

  test("renders loading spinner while fetching images", async () => {
    (fetch as jest.Mock).mockReturnValueOnce(new Promise(() => {}));

    await act(async () => {
      render(<ImagePickerDialog sdk={mockSdk} />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("cf-ui-spinner")).toBeInTheDocument();
    });
  });

  test("displays images after successful fetch", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        hits: mockImages,
        total: 2,
      }),
    });

    await act(async () => {
      render(<ImagePickerDialog sdk={mockSdk} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Nature, Forest")).toBeInTheDocument();
      expect(screen.getByText("Ocean, Beach")).toBeInTheDocument();
    });

    const imageElements = screen.getAllByRole("button");
    expect(imageElements.length).toBe(2);
  });

  test("handles error during fetch", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    await act(async () => {
      render(<ImagePickerDialog sdk={mockSdk} />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });

    expect(screen.getByText("Error: Fetch error")).toBeInTheDocument();
  });

  test("selects an image and closes the dialog with selected image", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        hits: mockImages,
        total: 2,
      }),
    });

    await act(async () => {
      render(<ImagePickerDialog sdk={mockSdk} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Nature, Forest")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Nature, Forest"));

    expect(mockSdk.close).toHaveBeenCalledWith({
      image: mockImages[0],
    });
  });

  test("handles pagination correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        hits: mockImages,
        total: 100,
      }),
    });

    await act(async () => {
      render(<ImagePickerDialog sdk={mockSdk} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Nature, Forest")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /next/i }));
    })

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("&page=2"));
  });
});
