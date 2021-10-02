import {
  isTweetUrl,
  isStackblitzUrl,
  isCodesandboxUrl,
  isCodepenUrl,
  isJsfiddleUrl,
  isYoutubeUrl,
  isValidHttpUrl,
  extractYoutubeVideoParameters,
  processLinksInCode,
  processOneLineLinks,
  processExternalLinks,
  getDomainName,
  getSiteUrl,
  getAbsoluteUrl,
} from './url';

describe('isTweetUrl', () => {
  it('should return true', () => {
    expect(isTweetUrl('https://twitter.com/test/status/849813577770778624')).toBe(true);
  });

  it('should return false', () => {
    expect(isTweetUrl('')).toBe(false);
    expect(isTweetUrl('https://example.com')).toBe(false);
  });
});

describe('isStackblitzUrl', () => {
  it('should return true', () => {
    expect(isStackblitzUrl('https://stackblitz.com/edit/js-fkebjy?file=index.js')).toBe(true);
  });

  it('should return false', () => {
    expect(isStackblitzUrl('')).toBe(false);
    expect(isStackblitzUrl('https://example.com')).toBe(false);
  });
});

describe('isCodesandboxUrl', () => {
  it('should return true', () => {
    expect(isCodesandboxUrl('https://codesandbox.io/embed/keen-roman-kpz43?fontsize=14&hidenavigation=1&theme=dark')).toBe(true);
  });

  it('should return false', () => {
    expect(isCodesandboxUrl('')).toBe(false);
    expect(isCodesandboxUrl('https://example.com')).toBe(false);
  });
});

describe('isCodepenUrl', () => {
  it('should return true', () => {
    expect(isCodepenUrl('https://codepen.io/technote-space/pen/NWgLZRY')).toBe(true);
  });

  it('should return false', () => {
    expect(isCodepenUrl('')).toBe(false);
    expect(isCodepenUrl('https://example.com')).toBe(false);
  });
});

describe('isJsfiddleUrl', () => {
  it('should return true', () => {
    expect(isJsfiddleUrl('https://jsfiddle.net/Technote/3upmsz2y/2/')).toBe(true);
  });

  it('should return false', () => {
    expect(isJsfiddleUrl('')).toBe(false);
    expect(isJsfiddleUrl('https://example.com')).toBe(false);
  });
});

describe('isYoutubeUrl', () => {
  it('should return true', () => {
    expect(isYoutubeUrl('https://www.youtube.com/watch?v=dHXC_ahjtEE')).toBe(true);
    expect(isYoutubeUrl('https://youtube.com/watch?v=dHXC_ahjtEE')).toBe(true);
    expect(isYoutubeUrl('https://youtu.be/watch?v=dHXC_ahjtEE')).toBe(true);
  });

  it('should return false', () => {
    expect(isYoutubeUrl('')).toBe(false);
    expect(isYoutubeUrl('https://example.com')).toBe(false);
  });
});

describe('isValidHttpUrl', () => {
  it('should return true', () => {
    expect(isValidHttpUrl('https://www.youtube.com/watch')).toBe(true);
    expect(isValidHttpUrl('https://example.com')).toBe(true);
  });

  it('should return false', () => {
    expect(isValidHttpUrl('')).toBe(false);
    expect(isValidHttpUrl('test')).toBe(false);
    expect(isValidHttpUrl('ftp://example.com')).toBe(false);
  });
});

describe('extractYoutubeVideoParameters', () => {
  it('should extract youtube video parameters', () => {
    expect(extractYoutubeVideoParameters('https://www.youtube.com/watch?v=dHXC_ahjtEE')).toEqual({
      start: undefined,
      videoId: 'dHXC_ahjtEE',
    });
    expect(extractYoutubeVideoParameters('https://www.youtube.com/watch?v=dHXC_ahjtEE&t=36')).toEqual({
      start: '36',
      videoId: 'dHXC_ahjtEE',
    });
    expect(extractYoutubeVideoParameters('https://youtu.be/dHXC_ahjtEE?t=36')).toEqual({
      start: '36',
      videoId: 'dHXC_ahjtEE',
    });
  });
});

describe('processLinksInCode', () => {
  it('should do nothing', () => {
    expect(processLinksInCode('')).toBe('');
    expect(processLinksInCode('a')).toBe('a');
    expect(processLinksInCode('<p>https://example.com\n<a href="https://example.com">https://example.com</a></p>')).toBe('<p>https://example.com\n<a href="https://example.com">https://example.com</a></p>');
  });

  it('should replace url', () => {
    expect(processLinksInCode('<p>https://example.com\n<pre><a href="https://example.com">https://example.com</a></pre></p>')).toBe('<p>https://example.com\n<pre>&#x3C;a href="https&#x3a;&#x2f;&#x2f;example.com">https&#x3a;&#x2f;&#x2f;example.com&#x3C;/a></pre></p>');
    expect(processLinksInCode('<p>https://example.com\n<pre><code><a href="https://example.com">https://example.com</a></code></pre></p>')).toBe('<p>https://example.com\n<pre><code>&#x3C;a href="https&#x3a;&#x2f;&#x2f;example.com">https&#x3a;&#x2f;&#x2f;example.com&#x3C;/a></code></pre></p>');
  });
});

describe('processOneLineLinks', () => {
  const replace = () => Promise.resolve('[[replaced]]');

  it('should do nothing', async () => {
    expect(await processOneLineLinks('', replace)).toBe('');
    expect(await processOneLineLinks('a', replace)).toBe('a');
    expect(await processOneLineLinks('<p><a href="https://example.com">test</a></p>', replace)).toBe('<p><a href="https://example.com">test</a></p>');
  });

  it('should replace url', async () => {
    expect(await processOneLineLinks('<p>https://example.com</p>', replace)).toBe('[[replaced]]');
    expect(await processOneLineLinks('<p><a href="https://example.com">https://example.com</a></p>', replace)).toBe('[[replaced]]');
    expect(await processOneLineLinks('<br>https://example.com<br>', replace)).toBe('<br>[[replaced]]<br>');
    expect(await processOneLineLinks('<p>test<br>https://example.com</p>', replace)).toBe('<p>test<br>[[replaced]]</p>');
  });
});

describe('processExternalLinks', () => {
  it('should do nothing', () => {
    expect(processExternalLinks('')).toBe('');
    expect(processExternalLinks('a')).toBe('a');
    expect(processExternalLinks('<a href="https://example.com" target="_blank" rel="noreferrer noopener">test</a>')).toBe('<a href="https://example.com" target="_blank" rel="noreferrer noopener">test</a>');
  });

  it('should add target property', () => {
    expect(processExternalLinks('<a href="https://example.com">test</a>')).toBe('<a href="https://example.com" target="_blank" rel="noreferrer noopener">test</a>');
    expect(processExternalLinks('<a href="https://example.com" rel="noreferrer noopener">test</a>')).toBe('<a href="https://example.com" target="_blank" rel="noreferrer noopener">test</a>');
  });

  it('should update rel property', () => {
    expect(processExternalLinks('<a href="https://example.com" target="_blank" >test</a>')).toBe('<a href="https://example.com" rel="noreferrer noopener" target="_blank">test</a>');
    expect(processExternalLinks('<a href="https://example.com" target="_blank" rel="">test</a>')).toBe('<a href="https://example.com" rel="noreferrer noopener" target="_blank">test</a>');
    expect(processExternalLinks('<a href="https://example.com" target="_blank" rel="noreferrer">test</a>')).toBe('<a href="https://example.com" rel="noreferrer noopener" target="_blank">test</a>');
    expect(processExternalLinks('<a href="https://example.com" target="_blank" rel="noopener">test</a>')).toBe('<a href="https://example.com" rel="noreferrer noopener" target="_blank">test</a>');
  });
});

describe('getDomainName', () => {
  it('should return hostname', () => {
    expect(getDomainName('https://example.com/test/123?test=456')).toBe('example.com');
  });
});

describe('getSiteUrl', () => {
  it('should get site url', () => {
    expect(getSiteUrl('https://example.com')).toBe('https://example.com');
    expect(getSiteUrl('https://example.com/test')).toBe('https://example.com');
    expect(getSiteUrl('https://user@example.com')).toBe('https://user@example.com');
    expect(getSiteUrl('https://user:password@example.com')).toBe('https://user:password@example.com');
  });
});

describe('getAbsoluteUrl', () => {
  it('should get absolute url', () => {
    expect(getAbsoluteUrl('https://example.com', { siteUrl: 'http://localhost:3000' })).toBe('https://example.com');
    expect(getAbsoluteUrl('https://example.com/test.png', { siteUrl: 'http://localhost:3000' })).toBe('https://example.com/test.png');
    expect(getAbsoluteUrl('/test.png', { siteUrl: 'http://localhost:3000' })).toBe('http://localhost:3000/test.png');
  });
});
