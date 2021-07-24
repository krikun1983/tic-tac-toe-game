const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const devServer = () =>
  !isDev
    ? {}
    : {
        devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        port: 8080,
        historyApiFallback: true,
        },
      };

const esLintPlugin = isDev =>
  isDev ? [] : [new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] })];

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devtool: isDev ? 'inline-source-map' : false,
  entry: {
    main: ['./index.tsx'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        // options: { publicPath: "." },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          sources: true,
        },
      },
    ],
  },
  plugins: [
    ...esLintPlugin(isDev),
    new MiniCssExtractPlugin({ filename: filename('css') }),
    new HtmlWebpackPlugin({
      template: './index.html', // template: path.resolve(__dirname, './src/index.html')
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  ...devServer(isDev),
};
