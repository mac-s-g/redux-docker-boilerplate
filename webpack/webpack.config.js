const path = require("path")
const webpack = require("webpack")
const fs = require("fs")
const ini = require("ini")

const wds_port = 6000

const credsFilePath = {
  modulePath1: path.join(__dirname, "..", "..", "..", "..", "creds.ini"),
  modulePath2: path.join(__dirname, "..", "..", "..", "..", "..", "creds.ini"),
  localPath1: path.join(__dirname, "..", "creds.ini"),
  localPath2: path.join(__dirname, "..", "..", "creds.ini")
}

const PATHS = {
  src: path.join(__dirname, "..", "src"),
  js: path.join(__dirname, "..", "src", "js"),
  style: path.join(__dirname, "..", "src", "style"),
  build: path.join(__dirname, "..", "dist")
}

const creds = {}

try {
  // path 1 to creds.ini when we are installed as a node_module
  fs.statSync(credsFilePath.modulePath1)

  creds.data = ini.parse(fs.readFileSync(credsFilePath.modulePath1, "utf-8"))
} catch (err) {
  try {
    // path 2 to creds.ini when we are installed as a node_module
    fs.statSync(credsFilePath.modulePath2)

    creds.data = ini.parse(fs.readFileSync(credsFilePath.modulePath2, "utf-8"))
  } catch (e) {
    try {
      // path to creds.ini in app folder
      fs.statSync(credsFilePath.localPath1)

      creds.data = ini.parse(fs.readFileSync(credsFilePath.localPath1, "utf-8"))
    } catch (err) {
      // path to creds.ini in git folder
      creds.data = ini.parse(fs.readFileSync(credsFilePath.localPath2, "utf-8"))
      // if we still dont have a creds file at this point let the error get thrown
    }
  }
}

const environment = creds.data.environment
const apiUrl = creds.data["url." + environment + ".conversation.api.url"]

const config = {
  mode: environment === "production" ? "production" : "development",
  entry: [path.join(PATHS.js, "entry.js")],
  externals: {},
  output: {
    path: PATHS.build,
    filename: "main.js",
    library: "BOILERPLATE-PROJECT-NAME",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(environment),
      "process.env.API_URL": JSON.stringify(apiUrl)
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".less"],
    alias: {
      "../../theme.config$": path.join(
        __dirname,
        "../src/css/semantic-ui-themes/theme.config"
      )
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: [PATHS.js]
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
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
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
