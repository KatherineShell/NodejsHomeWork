module.exports = {
    entry: {
        client: './src/index.js',
        server: './index.ts'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx']
    },
    target: 'node',
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(tsx|ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
