const getStoredOrPreferredColorMode = (): string => {
  try {
    const storedMode = localStorage.getItem('colorMode');
    if (storedMode === 'light' || storedMode === 'dark') {
      return storedMode;
    }

    if (!window.matchMedia) return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (error) {
    console.error('Error detecting system color scheme:', error);
    return 'dark'; // Default fallback
  }
};

export default getStoredOrPreferredColorMode;
