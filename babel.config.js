module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo'],
      '@babel/preset-typescript',
    ],
    plugins: [
      // React Native Reanimated plugin (if you use it)
      'react-native-reanimated/plugin',
      
      // Module resolver for path aliases
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
      ],
    ],
  };
};