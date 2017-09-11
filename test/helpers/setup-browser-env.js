// https://github.com/avajs/ava/issues/1506
const browserEnv = require('browser-env')
browserEnv(['document', 'Element', 'DocumentType', 'CharacterData'])
