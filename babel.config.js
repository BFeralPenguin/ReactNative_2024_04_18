module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './app/assets/index',
          '@theme': './app/ui/theme/index',
          '@strings': './app/strings',
        },
      },
    ],
  ],
};
