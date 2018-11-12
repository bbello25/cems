export class Logger {
  endPointUrl: string
  private apiKey: string

  constructor(endPointUrl: string, apiKey: string) {
    this.endPointUrl = 'http://' + endPointUrl + '/api/log/browserError'
    this.apiKey = apiKey
  }

  log(name: String, error: Error) {
    const errorLog = {
      name: error.name,
      source: name,
      message: error.message,
      stacktrace: error.stack,
      timestamp: new Date().toLocaleString()
    }

    fetch(this.endPointUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'api-key': this.apiKey
      },
      body: JSON.stringify(errorLog)
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  logString(error: any) {
    fetch(this.endPointUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'api-key': this.apiKey
      },
      body: JSON.stringify(error)
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }
}
