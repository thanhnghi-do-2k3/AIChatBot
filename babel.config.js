module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          hooks: './src/hooks',
          components: './src/components',
          theme: './src/theme',
          navigation: './src/navigation',
          screens: './src/screens',
        },
      },
    ],
  ],
};
