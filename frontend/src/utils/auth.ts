export const TOKEN_STORAGE = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
  removeAccessToken: () => localStorage.removeItem('accessToken'),
  clearTokens: () => {
    // 추후 확장 고려해 분리
    TOKEN_STORAGE.removeAccessToken();
  },
};

export const isAuthenticated = (): boolean => {
  return !!TOKEN_STORAGE.getAccessToken();
};
