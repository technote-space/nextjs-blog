import * as fs from 'fs';
import { join } from 'path';
import axios from 'axios';
import { loadImage } from './image';

jest.mock('fs');
jest.mock('axios');

describe('loadImage', () => {
  it('should load local image', async () => {
    const existsSyncMock = jest.fn(() => true);
    const readFileMock = jest.fn(() => 'test');

    jest.spyOn(fs, 'existsSync').mockImplementation(existsSyncMock);
    jest.spyOn(fs, 'readFileSync').mockImplementation(readFileMock);

    expect(await loadImage('images/test.png', 'https://example.com')).toBe('test');
    expect(existsSyncMock).toBeCalledWith(join(process.cwd(), 'public', 'images/test.png'));
    expect(readFileMock).toBeCalledWith(join(process.cwd(), 'public', 'images/test.png'));
  });

  it('should load remove image1', async () => {
    const existsSyncMock = jest.fn(() => false);
    const axiosGetMock = jest.fn(() => Promise.resolve({ data: '' }));

    jest.spyOn(fs, 'existsSync').mockImplementation(existsSyncMock);
    (axios.get as jest.Mock).mockImplementation(axiosGetMock);

    await loadImage('images/test.png', 'https://example.com');
    expect(existsSyncMock).toBeCalledWith(join(process.cwd(), 'public', 'images/test.png'));
    expect(axiosGetMock).toBeCalledWith('https://example.com/images/test.png', { 'responseType': 'arraybuffer' });
  });

  it('should load remove image2', async () => {
    const existsSyncMock = jest.fn(() => false);
    const axiosGetMock = jest.fn(() => Promise.resolve({ data: '' }));

    jest.spyOn(fs, 'existsSync').mockImplementation(existsSyncMock);
    (axios.get as jest.Mock).mockImplementation(axiosGetMock);

    await loadImage('https://example.com/aaa/images/test.png', 'https://example.com');
    expect(existsSyncMock).not.toBeCalledWith();
    expect(axiosGetMock).toBeCalledWith('https://example.com/aaa/images/test.png', { 'responseType': 'arraybuffer' });
  });
});
