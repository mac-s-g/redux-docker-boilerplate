const path = require("path")
const webpack = require("webpack")
const wds_port = BOILERPLATE-PORT

const PATHS = {
  src: path.join(__dirname, "..", "src"),
  js: path.join(__dirname, "..", "src", "js"),
  style: path.join(__dirname, "..", "src", "css"),
  build: path.join(__dirname, "..", "dev-server", "dist"),
  devServer: path.join(__dirname, "..", "dev-server")
}

const config = {
  entry: [path.join(PATHS.devServer, "js", "entry.js")],
  externals: {},
  devServer: {
    host: "localhost",
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.build,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  output: {
    path: PATHS.build,
    filename: "main.js",
    library: "BOILERPLATE-PROJECT-NAME",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV":
        process.env && process.env.NODE_ENV
          ? JSON.stringify(process.env.NODE_ENV)
          : JSON.stringify("development")
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"],
    // resolve all "../../theme.config" import calls to theme.config file
    alias: {
      "../../theme.config$": path.join(
        __dirname,
        "../src/css/semantic-ui-themes/theme.config"
      )
    }
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: [PATHS.js, PATHS.devServer]
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|cjs)$/,
        use: [
          {
            loader: "url-loader?limit=100000"
          }
        ]
      }
    ]
  }
}

module.exports = config
