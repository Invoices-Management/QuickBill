import nestEslintConfig from '@broker/eslint-config/nest';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...nestEslintConfig,
];
