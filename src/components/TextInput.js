import React from 'react';

export class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: props.initialValue }
    // BUT this.state.value is still undefined, becauase this.props.initialValue is undefined.
    console.log('init', this.state, props)
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    // Here, value becomes defined as the user types, and props are correct.
    console.log('render', this.state, this.props)
    return (
      <input type='text' value={this.state.value} onChange={this.handleChange} placeholder={this.props.name} />
    )
  }
}
