using cems.API.Data;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Helpers
{
    public class ApiKeyGenerator
    {
        private readonly DataContext _dataContext;

        public ApiKeyGenerator(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public string GenerateApiKey()
        {
            string apiKey;
            do
            {
                apiKey = RandomStringGenerator.RandomString(30);
            } while (_dataContext.WebApiKeys.FirstOrDefaultAsync(key => key.ApiKey == apiKey).Result != null);

            return apiKey;
        }
    }
}