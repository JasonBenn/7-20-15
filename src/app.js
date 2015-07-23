import { Canvas } from './components/canvas'
import React from 'react';
import 'normalize.css'
import './styles/main.scss'

React.render(<Canvas 
  height={500}
  width={500}
  lineWidth={2}
  gridSize={20}
  color='rgb(200,100,150)'
/>, document.getElementById('main'));
