import React from 'react';
import { Map } from 'immutable'

export class TextInput extends React.Component {
  onChange = (e) => {
    e.preventDefault()
    this.props.onChange(this.serialize(e.target.value))
  }

  serialize(value) {
    return Map([[this.props.name, this.normalizeInputValue(value)]]).toJS()
  }

  normalizeInputValue(value) {
    return this.props.type === 'number' ? +value : value
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
