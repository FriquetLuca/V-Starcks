module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    'eslint:recommended', 'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-non-null-assertion": "off"
  }
}
