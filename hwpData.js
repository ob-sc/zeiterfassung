module.exports = {
  hwp: dir => {
    return {
      filename: `${dir}/index.html`,
      template: './src/hbs/index.hbs',
      inject: 'head',
      title: dir
    };
  },
  hwpRoot: dir => {
    return {
      filename: `${dir}.html`,
      template: './src/hbs/root.hbs',
      inject: 'head',
      title: dir
    };
  }
  // hwpHash: dir => {
  //   return {
  //     filename: `${dir}/index.[chunkhash].html`,
  //     template: './src/hbs/index.hbs',
  //     inject: 'head',
  //     title: dir
  //   };
  // }
};
