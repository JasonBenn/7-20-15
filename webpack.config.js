// Use react hot loader someday: https://gaearon.github.io/react-hot-loader/2014/07/23/integrating-jsx-live-reload-into-your-react-workflow/

module.exports = {
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel' 
      }
    ]
  },

  entry: './src/app.js',

  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  node: {
    fs: 'empty' // fixes "Cannot resolve module 'fs' error"
  }

};
