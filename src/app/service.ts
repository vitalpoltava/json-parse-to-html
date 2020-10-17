import {Branch, Attrs, Content} from './types';

const tagMap = new Map([['paragraph', 'p']]);
const textMap = new Map();
const searches = new Map();
let lastSearch: Array<string>;

const getUniqueId = () => `${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`;
const getTag = tag => tagMap.get(tag) || tag;
const camelToDash = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

const getStyles = (attrs: Attrs = {}) => {
    const {textCSS} = attrs;
    const styles =
        textCSS &&
        Object.entries(textCSS)
            .map(([style, value]) => `${camelToDash(style)}:${value};`)
            .join('');
    return styles ? ` style="${styles}"` : '';
};

const hasChildNode = item => item && item.hasOwnProperty('content') && item.content.length > 0;

const renderBranch = (branch: Branch, html = '') => {
    if (hasChildNode(branch)) {
        const {type, attrs, content} = branch;
        return `<${getTag(type)}${getStyles(attrs)}>${renderContent(content)}</${getTag(type)}>`;
    } else {
        const textId = getUniqueId();
        const {type, text = '', attrs} = branch;
        textMap.set(text, textId);
        html += `<${getTag(type)}${getStyles(attrs)} id="${textId}">${text}</${getTag(type)}>`;
    }
    return html;
};

const findSearchIds = (mapObj: Map<string, string>, searchStr = '') => {
    const ids = [];
    for (const [text, id] of Array.from(mapObj)) {
        if (text.includes(searchStr)) {
            ids.push(id);
        }
    }
    return ids;
};

export const search = searchStr => {
    if (searches.has(searchStr)) {
        return searches.get(searchStr);
    }
    const ids = findSearchIds(textMap, searchStr);
    searches.set(searchStr, ids);
    lastSearch = ids;
    return ids;
};

export const renderContent = (content: Content): string => content.map(item => renderBranch(item)).join('');
export const getLastSearch = () => lastSearch;
export const getSearchHistory = () => Array.from(searches.keys());
