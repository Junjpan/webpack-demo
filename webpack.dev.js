const path = require('path');
const common=require('./webpack.common.js');
const merge=require('webpack-merge');
const HtmlWebpackPlugin=require('html-webpack-plugin');


module.exports =merge(common, {
    mode: "development",
    devtool: "none",
    module:{
        rules:[{
            test: /\.scss$/,
            use: ["style-loader",//3. inject style to the DOM, in the production mode, we want to use mini-css-extract-plugin instead
                  "css-loader",//2.turn css to javascript file
                  "sass-loader"] //1 turn sass to css file
                  //have to put these two loaders in order..css-loader transfer the css file to javascript ,and style loader add css to the DOM by enjecting <style> tag
        }],
    },
    plugins:[new HtmlWebpackPlugin({template:'./src/template.html'})],
    output: {
        filename: "[name].bundle.js",//in fact you can set anyname you want,such as entry.js
        path: path.resolve(__dirname, "dist") //instead of dist, you can set any folder name you want,for example"code" if that is the case, webpack will set up the output to /code/entry.js
    }
})