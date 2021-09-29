import { getRandomString } from './random';

describe('getRandomString', () => {
  it('should generate random string of the default length = 10', () => {
    const rand = getRandomString();
    expect(typeof rand).toBe('string');
    expect(rand).toHaveLength(10);
  });

  it('should generate random string of the specified length', () => {
    const rand = getRandomString(11);
    expect(typeof rand).toBe('string');
    expect(rand).toHaveLength(11);
  });
});
