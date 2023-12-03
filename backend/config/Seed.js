const bcrypt = require('bcrypt');

const pass = bcrypt.hashSync('admin', 12)
console.log(pass)