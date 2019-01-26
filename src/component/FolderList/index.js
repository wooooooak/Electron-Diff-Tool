import React, { Component } from "react";
import { Treebeard } from "react-treebeard";
import defaultTheme from "react-treebeard/src/themes/default";

import * as style from "./style";
import SearchBox from "../SearchBox";

// defaultTheme.tree.node.base = { cursor: "pointer" };
defaultTheme.tree.node.base.cursor = "pointer";
defaultTheme.tree.base.fontSize = "18px";

class FolderList extends Component {
  onToggle = (node, toggled) => {
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    if (node.type === "file") {
      this.props.onClickFile(node);
    }
    this.setState({});
  };

  render() {
    return (
      <style.ListContaineer>
        <SearchBox
          initTree={this.props.initTree}
          onFilter={this.props.onFilter}
        />
        <Treebeard
          style={defaultTheme}
          data={this.props.tree}
          onToggle={this.onToggle}
          clicked={this.onClickFile}
        />
      </style.ListContaineer>
    );
  }
}

export default FolderList;
