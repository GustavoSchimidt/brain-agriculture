import { configApp } from '@adonisjs/eslint-config'

export default configApp({
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    '@unicorn/filename-case': 'off',
    '@adonisjs/prefer-lazy-controller-import': 'off'
  },
})
