// Constant key name for storing the authentication token in localStorage
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

// Define a TypeScript type alias for Token
export type Token = string;

// Function to retrieve the token from localStorage
export const getToken = (): Token => {
  // Get the token from localStorage using the key name
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  // Return the token if found, otherwise return an empty string
  return token ?? '';
};

// Function to save a token to localStorage
export const saveToken = (token: Token): void => {
  // Store the token in localStorage with the specified key name
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

// Function to remove the token from localStorage
export const dropToken = (): void => {
  // Remove the token from localStorage using the key name
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
