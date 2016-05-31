import React, { Component } from 'react'
import 'brace'

export default class Editor extends Component {
  componentDidMount() {
    const {
      name, mode, theme,
    } = this.props;
    this.editor = ace.edit(name);
    this.editor.getSession().setMode('ace/mode/' + mode);
    this.editor.setTheme('ace/theme/' + theme);
    this.editor.setOptions({
      minLines: 16,
      maxLines: 16,
      fontSize: 16,
    });
  }
  render() {
    const { name } = this.props;
    return <div id={name}>
    </div>
  }
}
