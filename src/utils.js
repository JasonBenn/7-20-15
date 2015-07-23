import { fromJS } from 'immutable'
import camelCase from 'camelcase'

export const camelizeKeys = (obj) => fromJS(obj).mapKeys(camelCase).toJS()
