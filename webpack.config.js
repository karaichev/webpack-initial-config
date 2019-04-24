const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {

    /**
     * Context - базовая директория для точек входа и загрузчиков.
     * Указывается абсолютный путь от которого потом вычисляются точки входа.
     */
    context: path.resolve(__dirname, 'src'),

    /**
     * Точки входа. Для каждой точки создаётся своя сборка.
     */
    entry: {
        main: './js/index.js',
        player: './js/player.js',
        vendor: ['jquery']
    },

    /**
     * Указывает вебпаку путь для скомпилированных файлов.
     * В filename можно использоваться шаблон [name], который будет заменён
     * на название точки входа.
     */
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
    },

    /**
     * Настройки web-pack-dev-server
     */
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, 'public'), // путь к корневой директории
    },

    /**
     * Режим запуска можно указать тут.
     */
    // mode: 'development',
    // watch: true,

    /**
     * Определяется тип source mapping.
     * Для разработки удобно использовать source-map.
     * Для production - eval или не указывать.
     */
    devtool: 'source-map', // source-map, eval

    /**
     * Загрузчики
     */
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // Исключает загрузку из папки node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                        ]
                    }
                }
            },
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // минификация css
                        options: {
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader', // загрузка файлов в public
                        options: {
                            name: '[path][name].[ext]',
                            context: './src/img/', 
                            outputPath: 'img'
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader',
                    options: {
                        pretty: true, // Если убрать - будет сжатый html
                    }
                },
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            template: 'index.pug',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: 'about.pug',
            filename: 'about.html',
        }),
    ],

    /**
     * В этот массив можно добавить нестандартные расширения,
     * например jsx
     */
    resolve: {
        extensions: ['.js', '.json', '.jsx', '*'],
    },

    /**
     * Настройки оптимизации. Позволяет загружать сторонние библиотеки 
     * в отдельный файл и не включать их в каждый скомпилированный файл.
     */
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})], // минификация CSS
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: "vendor",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    }
};