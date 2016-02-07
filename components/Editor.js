import React, { Component } from 'react'
import brace from 'brace'
import 'brace/mode/forth'
import 'brace/theme/github'

class Editor extends Component {
  componentDidMount() {
    const { name } = this.props;
    this.editor = ace.edit(name);
    this.editor.getSession().setMode('ace/mode/forth');
    this.editor.setTheme('ace/theme/github');
    this.editor.setOptions({
      minLines: 20,
      maxLines: 20,
      fontSize: 16,
    });
  }
  render() {
    const { name } = this.props;
    return <div id={name}>
    </div>
  }
}

export default Editor
