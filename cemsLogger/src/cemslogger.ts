export default class Logger {
  endPointUrl: string
  private apiKey: string

  constructor(endPointUrl: string, apiKey: string) {
    this.endPointUrl = 'http://' + endPointUrl + '/api/log'
    this.apiKey = apiKey
  }

  log(error: Error) {
    console.log(error)
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
