import { randomBytes } from 'crypto';

export const getRandomString = (length = 10): string => randomBytes(length).reduce((p, i) => p + (i % 32).toString(32), '');
