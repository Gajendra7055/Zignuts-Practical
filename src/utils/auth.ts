const VALID_CREDENTIALS = [
  {email: 'test@zignuts.com', password: '123456'},
  {email: 'practical@zignuts.com', password: '123456'},
];

export const validateCredentials = (
  email: string,
  password: string,
): boolean => {
  return VALID_CREDENTIALS.some(
    cred => cred.email === email && cred.password === password,
  );
};

/**
 * Generate a unique token using timestamp and random values
 * This is a simple implementation that works in React Native without native modules
 */
export const generateToken = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart1 = Math.random().toString(36).substring(2, 15);
  const randomPart2 = Math.random().toString(36).substring(2, 15);
  const randomPart3 = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart1}-${randomPart2}-${randomPart3}`;
};

