import { fromJS } from 'immutable'
import camelCase from 'camelcase'
import { spiralDataTypes } from './data-types'

export const camelizeKeys = (obj) => fromJS(obj).mapKeys(camelCase).toJS()

export const normalizeValues = (obj, typeMapping) => fromJS(obj).map((v, k, iter) => {
  switch (typeMapping[k]) {
    case 'number': return +v; break
    case 'time': return new Date(v); break
    default: return v
  }
}).toJS()

export const parseSpiralData = (data) => camelizeKeys(normalizeValues(data, spiralDataTypes))
