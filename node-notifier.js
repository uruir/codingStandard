var path = require('path')
const notifier = require('node-notifier');

// Object
notifier.notify({
  'title': 'My notification',
  'message': 'Hello, there!',
  'appIcon': path.resolve(__dirname, '../public/uploads/site/favicon.jpg')
});