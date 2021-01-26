using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Paymentsense.Coding.Challenge.Api.Contract;
using Paymentsense.Coding.Challenge.Api.Extensions;

namespace Paymentsense.Coding.Challenge.Api.Clients.RestCountries {
    public class RestCountriesClient : IRestCountriesClient
    {
        private readonly HttpClient httpClient;

        public RestCountriesClient(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<IEnumerable<Country>> GetAllAsync()
        {
            var response = await httpClient.GetAsync("/rest/v2/all");
            if(!response.IsSuccessStatusCode) {
                throw new UpstreamException(response.RequestMessage.RequestUri, response.StatusCode);
            }

            var responseData = await response.ReadContentAsync<IEnumerable<Contract.Country>>();
            return responseData.Select(c => new Country { Name = c.Name, Flag = c.Flag });
        }
    }
}