// After this:
// Draw to canvas
// let user pick width, grid size
// save image to backend, multipart post

import { test } from 'tape'
import { List, Range, Repeat } from 'immutable'

const cycle = (toCycle) => { 
  let i = 0
  const length = toCycle.length

  return () => {
    const nextItem = toCycle[i]
    i = (i + 1) % length
    return nextItem
  }
}

const applyAndAppend = (list, fn) => { return list.push(fn(list.last())) }

const moveRight = ([row, col]) => [row, col + 1]
const moveDown = ([row, col]) => [row + 1, col]
const moveLeft = ([row, col]) => [row, col - 1]
const moveUp = ([row, col]) => [row - 1, col]

const getNextMove = cycle([
  moveRight,
  moveDown,
  moveLeft,
  moveUp
])

const spiralPoints = (gridSize) /* {row: int col: int} */ => {
  return Range(gridSize, 0, -1).reduce((spiralPoints, currentEdgeLength) => {
    return spiralPoints.concat(
      Repeat(getNextMove(), currentEdgeLength)
      .reduce(applyAndAppend, spiralPoints)
    )
  }, List([[0, 0]]))
}

console.log(spiralPoints(3).toArray())


// test('locate', (t) => {
  // ;[
  //   [{gridSize: 1, spiralDrawn: 1}, {row: 0, col: 0}],
  //   // return undefined if spiralDrawn exceeds spiralLength
  //   [{gridSize: 1, spiralDrawn: 2}, undefined],
  //   [{gridSize: 2, spiralDrawn: 3}, {row: 1, col: 1}],
  //   [{gridSize: 5, spiralDrawn: 12}, {row: 4, col: 1}],
  // ].forEach(({gridSize, spiralDrawn}, expectedResult) => {
  //   t.equal(locate(gridSize, spiralDrawn), expectedResult)
  // })
// })

// Spiral, made of
// Edges, made of 
// Points, with a
// Row and Col
// Moving from point to point: move

