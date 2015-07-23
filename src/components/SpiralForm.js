import React from 'react';

export class SpiralForm extends React.Component {
  render() {
    return (
      <form action="/api/spirals" method="POST" encType="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" value="Save spiral" />
      </form>
    )
  }
}
