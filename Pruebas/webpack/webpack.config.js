module.exports = {
    devServer: {
        static: __dirname, // Server’s root dir
        compress: true, // Enable gzip compresion when serving content
        port: 8080, // Default
        hot: false
    }
};