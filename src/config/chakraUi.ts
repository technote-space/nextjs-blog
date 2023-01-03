import type { extendTheme } from '@chakra-ui/react';
import type { GlobalStyleProps } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

export default {
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('orange.50', 'gray.800')(props),
      },
      main: {
        width: '100%',
      },
      h1: {
        color: mode('#545454', '#eee')(props),
        textShadow: mode('2px 2px 5px whitesmoke', '2px 2px 5px #333')(props),
      },
      article: {
        bg: mode('white', 'gray.800')(props),
        a: {
          color: mode('#1967d2', '#34a5ff')(props),
          _visited: {
            color: mode('#9967d2', '#af8eff')(props),
          },
          _hover: {
            color: mode('#e53900', '#e56930')(props),
          },
        },
        h2: {
          backgroundColor: mode('#e1f1ff', '#203162')(props),
        },
        table: {
          th: {
            backgroundColor: mode('#f5f6f7', '#444')(props),
          },
          tr: {
            _odd: {
              backgroundColor: mode('#fafbfc', '#333')(props),
            },
          },
        },
        blockquote: {
          backgroundColor: mode('#fafbfc', '#333435')(props),
        },
        p: {
          code: {
            backgroundColor: mode('#eee', '#444')(props),
          },
        },
        '.icon-link': {
          stroke: mode('#2329EEFF', 'white')(props),
        },
        '.toc-wrapper': {
          '.toc-title': {
            bg: mode('whitesmoke', 'gray.800')(props),
          },
          '.toc': {
            a: {
              color: mode('#545454', '#eee')(props),
            },
          },
        },
        '.alert-box': {
          bg: mode('#fdf2f2', 'transparent')(props),
        },
        '.memo-box': {
          bg: mode('#ebf8f4', 'transparent')(props),
        },
        '.information-box': {
          bg: mode('#f3fafe', 'transparent')(props),
        },
        '.comment-box': {
          bg: mode('#fefefe', 'transparent')(props),
        },
        '.ok-box': {
          bg: mode('#f2fafb', 'transparent')(props),
        },
        '.ng-box': {
          bg: mode('#ffe7e7', 'transparent')(props),
        },
        '.good-box': {
          bg: mode('#f7fcf7', 'transparent')(props),
        },
        '.bad-box': {
          bg: mode('#fff1f4', 'transparent')(props),
        },
        '.profile-box': {
          bg: mode('#fefefe', 'transparent')(props),
        },
      },
      '.article-card': {
        bg: mode('white', 'gray.800')(props),
        _hover: {
          bg: mode('#fbffff', 'gray.700')(props),
        },
        h2: {
          color: mode('#333', '#eee')(props),
        },
        h3: {
          color: mode('#333', '#eee')(props),
        },
      },
      header: {
        bg: mode('white', 'gray.800')(props),
      },
      footer: {
        bg: mode('white', 'gray.800')(props),
      },
    }),
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  fonts: {
    body: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  },
} as Parameters<typeof extendTheme>[number];
