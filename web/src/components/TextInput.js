import React from 'react';
import { Map } from 'immutable'

export class TextInput extends React.Component {
  onChange = (e) => {
    e.preventDefault()
    this.props.onChange(this.serialize(e.target.value))
  }

  serialize(rawValue) {
    const value = this.props.type === 'number' ? +rawValue : rawValue
    return Map([[this.props.name, value]]).toJS()
  }

  static defaultProps = {
    type: 'text'
  }

  render() {
    return (
      <input type={this.props.type} value={this.props.value} onChange={this.onChange} placeholder={this.props.name} />
    )
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired
  }
}
