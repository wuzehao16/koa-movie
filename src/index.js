import { promisify } from 'util'
import { resolve as r} from 'path'
import { readFile } from 'fs'
promisify(readFile)(r(__dirname,'../package.json'))
  .then(data => {
    data = JSON.parse(data)
    console.log(data)
  })

  async function init() {
    let data = await readAsync('./package.json')

    data = JSON.parse(data)

    console.log(data)
  }
  init()
