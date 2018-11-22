using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using cems.Logger;
using Newtonsoft.Json;

namespace cems.Logger_csharp
{
    public class Logger
    {
        private readonly string _apiKey;
        private readonly HttpClient _client;
        private readonly string _baseUrl = "http://localhost:5000/api/log";

        public Logger(string apiKey)
        {
            _apiKey = apiKey;
            _client = new HttpClient();
        }

        public async Task LogErrorAsync(LogEntry error)
        {
            var content = new StringContent(JsonConvert.SerializeObject(error), Encoding.UTF8, "application/json");
            content.Headers.Add("api-key", _apiKey);
            Console.WriteLine(await _client.PostAsync(_baseUrl, content));
        }

        public void LogError(LogEntry error)
        {
            var content = new StringContent(JsonConvert.SerializeObject(error), Encoding.UTF8, "application/json");
            content.Headers.Add("api-key", _apiKey);
            var res = _client.PostAsync(_baseUrl, content).GetAwaiter().GetResult();
            Console.WriteLine(res);
        }
    }
}