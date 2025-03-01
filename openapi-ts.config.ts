export default {
  input: 'http://127.0.0.1:8000/api/v1/openapi.json',
  output: 'src/client',
  plugins: ['@hey-api/client-axios'], 
};