const mockSdk: any = {
  app: {
    onConfigure: jest.fn(),
    getParameters: jest.fn().mockReturnValueOnce({}),
    setReady: jest.fn(),
    getCurrentState: jest.fn(),
  },
  ids: {
    app: 'test-app',
  },
  window: {
    startAutoResizer: jest.fn(),
  },
  dialogs: {
    openCurrentApp: jest.fn(),
  },
  parameters: {
    invocation: {
      apiUrl: 'https://pixabay.com/api/?key=API_KEY',
    },
  },
  field: {
    getValue: jest.fn(),
    setValue: jest.fn(),
  },
  close: jest.fn(),
};

export { mockSdk };
