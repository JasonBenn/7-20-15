// Use react hot loader someday: https://gaearon.github.io/react-hot-loader/2014/07/23/integrating-jsx-live-reload-into-your-react-workflow/

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?stage=0'
      }, {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },

  entry: {
    app: ['webpack/hot/dev-server', './src/app.js']
  },

  output: {
    path: "./build",
    publicPath: "/assets/",
    filename: "bundle.js"
  },

  devServer: {
    proxy: {
      '/api/*': 'http://localhost:4567/',
      headers: { "Access-Control-Allow-Origin": "*" }
    },
    noInfo: true
  },

  node: {
    fs: 'empty'
  }

};
