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
};

export { mockSdk };
