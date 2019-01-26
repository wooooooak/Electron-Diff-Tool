import React from "react";
import * as style from "./style";

const defaultMatcher = (filterText, node) => {
  return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

const findNode = (node, filter, matcher) => {
  return (
    matcher(filter, node) ||
    (node.children &&
      node.children.length &&
      !!node.children.find(child => findNode(child, filter, matcher)))
  );
};

const filterTree = (node, filter, matcher = defaultMatcher) => {
  if (matcher(filter, node) || !node.children) {
    return node;
  }
  const filtered = node.children
    .filter(child => findNode(child, filter, matcher))
    .map(child => filterTree(child, filter, matcher));
  return { ...node, ...{ children: filtered } };
};

const expandFilteredNodes = (node, filter, matcher = defaultMatcher) => {
  let children = node.children;
  if (!children || children.length === 0) {
    return { ...node, ...{ toggled: false } };
  }
  const childrenWithMatches = node.children.filter(child =>
    findNode(child, filter, matcher)
  );
  const shouldExpand = childrenWithMatches.length > 0;
  if (shouldExpand) {
    children = childrenWithMatches.map(child => {
      return expandFilteredNodes(child, filter, matcher);
    });
  }
  return { ...node, ...{ children: children, toggled: shouldExpand } };
};

const onFilterMouseUp = (e, initTree, onFilter) => {
  if (e.charCode === 13) {
    const filterName = e.target.value.trim();
    if (!filterName) {
      // 없으면 처음 쌩 데이터를 받아와야 한다
      return onFilter(initTree);
    }
    let filtered = filterTree(initTree, filterName);
    filtered = expandFilteredNodes(filtered, filterName);
    onFilter(filtered);
  }
};

const Search = ({ initTree, onFilter }) => {
  return (
    <style.InputWrapper>
      <style.Input
        type="text"
        onKeyPress={e => onFilterMouseUp(e, initTree, onFilter)}
        placeholder="파일명을 입력하세요."
      />
      <style.Button>
        <style.SearchIcon />
      </style.Button>
    </style.InputWrapper>
  );
};

export default Search;
