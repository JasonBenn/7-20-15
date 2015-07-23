import { Canvas } from './components/canvas'
import React from 'react';
import 'normalize.css'
import './styles/main.scss'

React.render(<div>
  <form action="/api/spirals" method="POST" encType="multipart/form-data">
    <input type="file" name="file" />
    <input type="submit" value="Save spiral" />
  </form>

  <Canvas 
    height={500}
    width={900}
    lineWidth={2}
    gridSize={10}
    color='green'
  />
</div>, document.getElementById('main'));
