import React from 'react';
import { Map } from 'immutable'

export class TextInput extends React.Component {
  onChange = (e) => {
    e.preventDefault()
    this.props.onChange(Map([[this.props.name, e.target.value]]).toJS())
  }

  render() {
    return (
      <input type='text' value={this.props.value} onChange={this.onChange} placeholder={this.props.name} />
    )
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired
  }
}
