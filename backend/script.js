const { v4: uuidv4 } = require('uuid');

const password = uuidv4();

const formatted = password.replace(/-/g, '');

console.log(formatted)