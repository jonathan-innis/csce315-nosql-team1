var config = {
    externals: {
        'react': 'react', 
        'react-dom' : 'reactDOM' 
    },
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
    }
}

var homepage = Object.assign({}, config, {
    entry : "./src/jsx/Home.jsx",
    output : {
        path : __dirname + "/dist", 
        filename :  "homepage.js"
    }
})


module.exports = [
    homepage
]