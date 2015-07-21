import { is, List, Range, Repeat } from 'immutable'

const cycle = (toCycle) => { 
  let i = 0
  return () => {
    i = i % toCycle.length
    return toCycle[i++]
  }
}

const applyAndAppend = (list, fn) => list.push(fn(list.last()))
const compareArrays = (a, b) => is(List(a), List(b))
// If the *only* argument passed to fn is undefined, instead return defaultValue.
const withDefault = (fn, defaultValue) => (...args) => compareArrays(args, [undefined]) ? defaultValue : fn(...args)

const moveRight = ([row, col]) => [row, col + 1]
const moveDown = ([row, col]) => [row + 1, col]
const moveLeft = ([row, col]) => [row, col - 1]
const moveUp = ([row, col]) => [row - 1, col]

const nextMoves = [
  moveRight,
  moveDown,
  moveLeft,
  moveUp
].map(fn => withDefault(fn, [0, 0]))

const getSpiralPoints = (gridSize) => {
  const getNextMove = cycle(nextMoves)
  return Range(gridSize, 0, -1).reduce((spiralPoints, currentEdgeLength) => {
    return Repeat(getNextMove(), currentEdgeLength).reduce(applyAndAppend, spiralPoints)
  }, List())
}

console.log(getSpiralPoints(0))
console.log(getSpiralPoints(1))
console.log(getSpiralPoints(2))
console.log(getSpiralPoints(3))