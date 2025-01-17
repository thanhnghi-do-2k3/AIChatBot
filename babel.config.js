module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json', '.d.ts', '.tsx', '.ts'],
        alias: {
          hooks: './src/hooks',
          components: './src/components',
          theme: './src/theme',
          navigation: './src/navigation',
          screens: './src/screens',
          constant: './src/constants',
          api: './src/api',
          store: './src/store',
          features: './src/features',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
