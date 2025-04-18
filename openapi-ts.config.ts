import { defaultPlugins } from '@hey-api/openapi-ts';

export default {
  input: 'http://127.0.0.1:8000/api/v1/openapi.json',
  output: 'src/client',
  plugins: [
    ...defaultPlugins,
    '@hey-api/client-axios',
    '@tanstack/react-query',
    {
      enums: 'typescript', 
      name: '@hey-api/typescript',
    },
  ], 
};