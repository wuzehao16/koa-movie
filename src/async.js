const fs = require('fs');
const co = require('co');
const util = require('util');

const readAsync = util.promisify(fs.readFile)

co(function *() {
  let data = yield readAsync('./package.json')
  console.log(JSON.parse(data))
})

async function init() {
  let data = await readAsync('./package.json')

  data = JSON.parse(data)

  console.log(data)
}
init()
