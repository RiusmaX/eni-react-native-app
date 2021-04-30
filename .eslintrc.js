module.exports = {
  root: true,
  extends: 'standard',
  rules: {
    camelCase: ['error', { allow: ['jwt_decode'] }]
  }
}
