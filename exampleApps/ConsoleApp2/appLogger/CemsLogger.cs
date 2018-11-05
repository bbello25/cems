using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace appLogger
{
    public class CemsLogger
    {
        private static readonly HttpClient client;
        private static string baseUrl = "http://localhost:5000/api/log";

        static CemsLogger()
        {
            client = new HttpClient();
        }

        public async Task LogError(LogEntry error)
        {
            var content = new StringContent(JsonConvert.SerializeObject(error), Encoding.UTF8, "application/json");
            content.Headers.Add("api-key", "75nbvlbxc3");
            Console.WriteLine(await client.PostAsync(baseUrl, content));
        }
    }
}