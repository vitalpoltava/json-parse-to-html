import { Branch, Attrs, Content } from './types';

const tagMap = new Map([['paragraph', 'p']]);
const textMap = new Map();
const searches = new Map();

const getUniqueId = () => `${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`;
const getTag = tag => tagMap.get(tag) || tag;
const camelToDash = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

/**
 * @description
 * Create inline styles string, based on config
 *
 * @param attrs
 */
const getStyles = (attrs: Attrs = {}) => {
  const { textCSS } = attrs;
  const styles =
    textCSS &&
    Object.entries(textCSS)
      .map(([style, value]) => `${camelToDash(style)}:${value};`)
      .join('');
  return styles ? ` style="${styles}"` : '';
};

/**
 * @description
 * Check if child tree node exists (to decide if we need to go deeper)
 *
 * @param item
 */
const hasChildNode = item => item && item.hasOwnProperty('content') && item.content.length > 0;

/**
 * @description
 * Traversing the json tree with circular dependency to be able to go through
 * list of multiple leafs.
 *
 * @param branch
 * @param html
 */
const renderBranch = (branch: Branch, html = '') => {
  if (hasChildNode(branch)) {
    const { type, attrs, content } = branch;
    return `<${getTag(type)}${getStyles(attrs)}>${renderContent(content)}</${getTag(type)}>`;
  } else {
    const textId = getUniqueId();
    const { type, text = '', attrs } = branch;
    textMap.set(text, textId);
    html += `<${getTag(type)}${getStyles(attrs)} id="${textId}">${text}</${getTag(type)}>`;
  }
  return html;
};

/**
 * @description
 * Find a list of ids of text nodes which has the search term (once or more)
 *
 * @param mapObj
 * @param searchStr
 */
const findSearchIds = (mapObj: Map<string, string>, searchStr = '') => {
  const ids = [];
  for (const [text, id] of Array.from(mapObj)) {
    if (text.toLowerCase().includes(searchStr.toLowerCase())) {
      ids.push(id);
    }
  }
  return ids;
};

/**
 * @description
 * Wrapper search function to memoize searches in order to improve performance,
 * and save searches history to use in UI
 *
 * @param searchStr
 */
export const search = searchStr => {
  if (searches.has(searchStr)) {
    return searches.get(searchStr);
  }
  const ids = findSearchIds(textMap, searchStr);
  searches.set(searchStr, ids);
  return ids;
};

/**
 * API
 */
export const renderContent = (content: Content): string => content.map(item => renderBranch(item)).join('');
export const getSearchHistory = () => Array.from(searches.keys());
