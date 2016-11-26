const nconf = require('nconf');
const config = module.exports = nconf.argv()

.env([
  'APP_SECRET',
  'SNAKE_DB_URL'
])

.defaults({
  'HTTPS': (process.env.NODE_ENV === 'production')
})
