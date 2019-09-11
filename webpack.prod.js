const path = require('path');
const common=require('./webpack.common.js');
const merge=require('webpack-merge');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TersePlugin=require('terser-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports = merge(common,{
    //entry: "./src/index.js", we don't need to entry point here since we keep it in the common one
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",//in fact you can set anyname you want,such as entry.js
        path: path.resolve(__dirname, "dist") //instead of dist, you can set any folder name you want,for example"code" if that is the case, webpack will set up the output to /code/entry.js
    },
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin(),
            new TersePlugin()   
        ]
    },
    plugins:[new MiniCssExtractPlugin ({filename:"[name].[contentHash].css"}),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template:'./src/template.html',
                minify:{  //minify html
                    removeComments:true,
                    removeAttributeQuotes:true,
                    collapseWhitespace:true
                }
            })
            ],
    module:{
        rules:[{
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader,//3. extract css to the files
                  "css-loader",//2.turn css to javascript file
                  "sass-loader"] //1 turn sass to css file
                  //have to put these two loaders in order..css-loader transfer the css file to javascript ,and style loader add css to the DOM by enjecting <style> tag
        }]
    }        
})