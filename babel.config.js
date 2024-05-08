module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@types': './app/types',
          '@assets': './app/assets/index',
          '@components': './app/ui/components',
          '@screens': './app/ui/screens',
          '@theme': './app/ui/theme/index',
          '@strings': './app/strings',
          '@mocks': './app/mocks',
        },
      },
    ],
  ],
};
