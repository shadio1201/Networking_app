const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const password = uuidv4();


async function generateSecret() {

    const hash = bcrypt.hashSync('s6hdk28aknv_sadkj3', 10)

    console.log(hash)
    
}

const time = Date.now().toFixed()

console.log(time.getTime())

generateSecret();

/* const formatted = password.replace(/-/g, '');

const array = ['b47d236c969c49caaded5ccda2297c8c', 'd3c834dc2a2149ad8ff98cbbd4487bbd']

const string = JSON.stringify(array).replace(/[\[\]]+/g, '').replace(/"/g, "'");

console.log(string) */