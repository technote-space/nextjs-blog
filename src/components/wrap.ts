import type { SystemProps } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';

export type StyleProps = SystemProps;
export const wrap = chakra;

const Globals = ['-moz-initial', 'inherit', 'initial', 'revert', 'unset'];
const SelfPosition = ['center', 'end', 'flex-end', 'flex-start', 'self-end', 'self-start', 'start'];
const ContentDistribution = ['space-around', 'space-between', 'space-evenly', 'stretch'];
const ContentPosition = ['center', 'end', 'flex-end', 'flex-start', 'start'];
export const storybookArgTypes = {
  padding: { control: { type: 'number' } },
  paddingX: { control: { type: 'number' } },
  paddingY: { control: { type: 'number' } },
  paddingTop: { control: { type: 'number' } },
  paddingRight: { control: { type: 'number' } },
  paddingBottom: { control: { type: 'number' } },
  paddingLeft: { control: { type: 'number' } },
  margin: { control: { type: 'number' } },
  marginX: { control: { type: 'number' } },
  marginY: { control: { type: 'number' } },
  marginTop: { control: { type: 'number' } },
  marginRight: { control: { type: 'number' } },
  marginBottom: { control: { type: 'number' } },
  marginLeft: { control: { type: 'number' } },
  textColor: { control: { type: 'color' } },
  color: { control: { type: 'color' } },
  fontWeight: { control: { type: 'text' } },
  lineHeight: { control: { type: 'number' } },
  letterSpacing: { control: { type: 'number' } },
  fontSize: { control: { type: 'number' } },
  textAlign: {
    control: {
      type: 'select',
      options: ['center', 'end', 'justify', 'left', 'match-parent', 'right', 'start', ...Globals],
    },
  },
  fontStyle: { control: { type: 'inline-radio', options: ['italic', 'normal', 'oblique', ...Globals] } },
  wordBreak: {
    control: {
      type: 'select',
      options: ['break-all', 'break-word', 'keep-all', 'normal', ...Globals],
    },
  },
  overflowWrap: { control: { type: 'inline-radio', options: ['anywhere', 'break-word', 'normal', ...Globals] } },
  textOverflow: { control: { type: 'inline-radio', options: ['clip', 'ellipsis', ...Globals] } },
  textTransform: {
    control: {
      type: 'select',
      options: ['capitalize', 'full-size-kana', 'full-width', 'lowercase', 'none', 'uppercase', ...Globals],
    },
  },
  whiteSpace: {
    control: {
      type: 'select',
      options: ['-moz-pre-wrap', 'break-spaces', 'normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', ...Globals],
    },
  },
  alignItems: {
    control: {
      type: 'select',
      options: [...SelfPosition, 'baseline', 'normal', 'stretch', ...Globals],
    },
  },
  alignContent: {
    control: {
      type: 'select',
      options: [...ContentDistribution, ContentPosition, 'baseline', 'normal', ...Globals],
    },
  },
  justifyItems: {
    control: {
      type: 'select',
      options: [...SelfPosition, 'baseline', 'left', 'legacy', 'normal', 'right', 'stretch', ...Globals],
    },
  },
  justifyContent: {
    control: {
      type: 'select',
      options: [...ContentDistribution, ContentPosition, 'left', 'normal', 'right', ...Globals],
    },
  },
  flexWrap: { control: { type: 'inline-radio', options: ['nowrap', 'wrap', 'wrap-reverse', ...Globals] } },
  flexFlow: {
    control: {
      type: 'select',
      options: ['column', 'column-reverse', 'nowrap', 'row', 'row-reverse', 'wrap', 'wrap-reverse', ...Globals],
    },
  },
  flexBasis: { control: { type: 'text' } },
  flexDir: {
    control: {
      type: 'select',
      options: ['column', 'column-reverse', 'row', 'row-reverse', ...Globals],
    },
  },
  flex: { control: { type: 'text' } },
  flexGrow: { control: { type: 'text' } },
  flexShrink: { control: { type: 'text' } },
  display: {
    control: {
      type: 'select',
      options: ['block', 'inline', 'run-in', '-ms-flexbox', '-ms-grid', '-webkit-flex', 'flex', 'flow', 'flow-root', 'grid', 'ruby', 'table', 'ruby-base', 'ruby-base-container', 'ruby-text', 'ruby-text-container', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row', 'table-row-group', 'contents', 'list-item', 'none', ...Globals],
    },
  },
  width: { control: { type: 'number' } },
  maxWidth: { control: { type: 'number' } },
  minWidth: { control: { type: 'number' } },
  height: { control: { type: 'number' } },
  maxHeight: { control: { type: 'number' } },
  minHeight: { control: { type: 'number' } },
  overflow: {
    control: {
      type: 'select',
      options: ['-moz-hidden-unscrollable', 'auto', 'clip', 'hidden', 'scroll', 'visible', ...Globals],
    },
  },
  overflowX: {
    control: {
      type: 'select',
      options: ['-moz-hidden-unscrollable', 'auto', 'clip', 'hidden', 'scroll', 'visible', ...Globals],
    },
  },
  overflowY: {
    control: {
      type: 'select',
      options: ['-moz-hidden-unscrollable', 'auto', 'clip', 'hidden', 'scroll', 'visible', ...Globals],
    },
  },
  float: {
    control: {
      type: 'select',
      options: ['inline-end', 'inline-start', 'left', 'none', 'right', ...Globals],
    },
  },
  objectFit: {
    control: {
      type: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down', ...Globals],
    },
  },
  borderWidth: { control: { type: 'number' } },
  borderStyle: {
    control: {
      type: 'select',
      options: ['dashed', 'dotted', 'double', 'groove', 'hidden', 'inset', 'none', 'outset', 'ridge', 'solid', ...Globals],
    },
  },
  borderColor: { control: { type: 'color' } },
  borderRadius: { control: { type: 'number' } },
  boxShadow: { control: { type: 'text' } },
  opacity: { control: { type: 'number' } },
  backgroundColor: { control: { type: 'color' } },
  backgroundImage: { control: { type: 'text' } },
  listStyleType: { control: { type: 'inline-radio', options: ['disc', 'circle', 'none'] } },
  top: { control: { type: 'number' } },
  right: { control: { type: 'number' } },
  bottom: { control: { type: 'number' } },
  left: { control: { type: 'number' } },
  position: {
    control: {
      type: 'select',
      options: ['-webkit-sticky', 'absolute', 'fixed', 'relative', 'static', 'sticky', ...Globals],
    },
  },
  textDecoration: { control: { type: 'text' } },
};
