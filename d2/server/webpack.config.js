var path = require('path')
var OnlyIfChangedPlugin = require('only-if-changed-webpack-plugin');

var opts = {
    rootDir: process.cwd(),
    devBuild: process.env.NODE_ENV !== 'production',
};

var config = {

    module : {
        rules : [
            {
                test: /.jsx$/,
                loader : "babel-loader",
                exclude : /node_modules/,
                query : {
                    presets : ["es2015", 'react']
                }
            },
            {
                test : /\.(css)$/,
                loader : "style-loader!css-loader"
            },
            {
                test : /\.(png|jpg|gif|svg)$/,
                loader : "file-loader",
                options : {
                    name : '[name].[ext]?[hash]'
                }
            },
            {
                test : /\.(otf|eot|woff|woff2|ttf|svg)$/,
                loader : "file-loader"
            }
        ],
    },
    plugins: [
        new OnlyIfChangedPlugin({
          cacheDirectory: path.join(opts.rootDir, 'dist/tmp/cache'),
          cacheIdentifier: opts, // all variable opts/environment should be used in cache key
        })
    ]
}

var homepage = Object.assign({}, config, {
    entry : "./src/home.jsx",
    output : {
        path : __dirname + "/dist", 
        filename :  "homepage.js"
    }
})

var moviepage = Object.assign({}, config, {
    entry : "./src/movie.jsx",
    output : {
        path : __dirname + "/dist", 
        filename :  "moviepage.js"
    }
})

var personpage = Object.assign({}, config, {
    entry : "./src/person.jsx",
    output : {
        path : __dirname + "/dist", 
        filename :  "personpage.js"
    }
})

var resultspage = Object.assign({}, config, {
    entry : "./src/results.jsx",
    output : {
        path : __dirname + "/dist", 
        filename :  "resultspage.js"
    }
})

var react = {
    entry : "./node_modules/react/umd/react.development.js",
    output : {
        path : __dirname + "/dist", 
        filename :  "react.js"
    }
}

module.exports = [
    homepage,
    moviepage,
    personpage,
    resultspage,
    react
]