import Logger from './dist/cemslogger.es5.js'
import StrackTrace from './node_modules/stack-trace'

//const logger = new Logger('localhost:5000', 'fudlis0k4b')

window.onerror = (msg, url, lineNo, columnNo, error) => {
  const _string = msg.toLowerCase()
  const substring = 'script error'


  StackTrace.fromError(error)
    .then(console.log);

  if (_string.indexOf(substring) > -1) {
    alert('Script Error: See Browser Console for Detail')
  } else {
    const errorData = {
      //name: error.name,
      message: error.message,
      source: document.location.href,
      stacktrace: error.stack,
      timestamp: "Nov 5, 2018, 8:25:32 PM"
    }

    // logger.logString(errorData)
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
