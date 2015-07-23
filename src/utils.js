import { fromJS } from 'immutable'
import camelCase from 'camelcase'

export const camelizeKeys = (any) => fromJS(any).mapKeys(camelCase).toJS()
