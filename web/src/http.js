import $ from 'jquery'
import { fromJS } from 'immutable'

export default {
  get(url) {
    return $.get(url)
  },

  multiPartPost(url, body, callback) {
    const formData = new FormData();
    fromJS(body).forEach((v, k) => formData.append(k, v))
    const req = new XMLHttpRequest()
    req.open('POST', url)
    req.send(formData)
    // (err, res) => {
        // console.log(arguments)
      // }
    // invoke callback with result - also should return promise
  },
}
