// TODO: Add test
export const replaceAll = (text: string, from: string | RegExp, to: string): string => {
  if (typeof from === 'string') {
    return text.split(from).join(to);
  }

  return text.replace(from, to);
};

export const pregQuote = (str: string, delimiter?: string) => str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');

export const escapeHtml = (str: string): string => str.replace(/[&'`"<>]/g, match => {
  return {
    '&': '&amp;',
    '\'': '&#x27;',
    '`': '&#x60;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;',
  }[match] ?? match;
});
