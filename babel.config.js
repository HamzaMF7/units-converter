module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo'],
      '@babel/preset-typescript',
    ],
    plugins: [
      // React Native Reanimated plugin migrated to react-native-worklets
      'react-native-worklets/plugin',
      
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
