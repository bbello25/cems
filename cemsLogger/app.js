import Logger from './dist/cemslogger.es5.js'

const logger = new Logger('localhost:5000', '75nbvlbxc3')

window.onerror = (msg, url, lineNo, columnNo, error) => {
  const _string = msg.toLowerCase()
  const substring = 'script error'
  if (_string.indexOf(substring) > -1) {
    alert('Script Error: See Browser Console for Detail')
  } else {
    const errorData = {
      name: error.name,
      message: error.message,
      source: document.location.href,
      stacktrace: error.stack
    }

    logger.logString(errorData)
  }

  return false
}

// logger.Log(new Error('error'))
function logErrro() {
  throw new TypeError('Glboal handler')
}

function logError2() {
  console.log('test')
  logErrro()
  return false
}

logError2()
