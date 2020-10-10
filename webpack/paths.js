const path = require( 'path' );

module.exports = {
  root: path.resolve( __dirname, '../' ),
  outputPath: path.resolve( __dirname, '../', 'build' ),
  entryPath: path.resolve( __dirname, '../', 'src/index.jsx' ),
  templatePath: path.resolve( __dirname, '../', 'src/template.html' ),
  assetsPath: path.resolve( __dirname, '../', 'src/assets' ),
  imagesFolder: path.resolve( __dirname, '../', 'src/assets/images' ),
  filesFolder: path.resolve( __dirname, '../', 'src/assets/files' ),
  fontsFolder: path.resolve( __dirname, '../', 'src/assets/fonts' ),
  cssFolder: 'css',
  jsFolder: 'js',
};
