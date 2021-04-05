let path = require('path');
let glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let conf = {    
    entry: ['./src/main.js', './src/assets/css/style.scss'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        //  clean: true //с dev-server пропадают пути у img после внесения правок в css, в development нужно отключить
    },     
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'                     
                }
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1                             
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {                                 
                                plugins: [
                                    [
                                        "postcss-preset-env"                                         
                                    ]
                                ],
                            },
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {                                   
                                // outputStyle: 'expanded', // откл. минификации CSS
                                outputStyle: "compressed", //минифицированный css
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'public/img/[name][ext]'
                }                 
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset',
                generator: {
                    filename: 'public/fonts/[name][ext]'
                }
            },                
                              
            
        ]
    },
    devServer: {         
        overlay: {
            warnings: true,
            errors: true,
        }
    },
    plugins: [          
        new MiniCssExtractPlugin({
            filename: 'public/css/main.css'
        }),         
        ...glob.sync('./src/*.html').map((htmlFile) => {
            return new HtmlWebpackPlugin({                 
                filename: path.basename(htmlFile),
                template: `./src/${path.basename(htmlFile)}`,
                inject: 'body',
                minify: false,
            });
        })                 
    ],
    optimization: {  
        minimize: true,       
        minimizer: [
            new CssMinimizerPlugin({                 
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                }
            }),
            new TerserPlugin()
        ],
        
    }  
}; 
module.exports = (env, argv) => {
    let isProd = argv.mode === 'production';
      // карта кода js в development (для CSS нужно указать 'source-map' )
    conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
    // карта кода js, css в development и prodaction
    // conf.devtool = 'source-map';
    // в IE11 dev-server не работает пока не выйдет версия 4
    conf.target = isProd ? 'browserslist' : 'web';

    return conf;
}