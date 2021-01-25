using System.Collections.Generic;
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

            return await response.ReadContentAsync<IEnumerable<Country>>();
        }
    }
}