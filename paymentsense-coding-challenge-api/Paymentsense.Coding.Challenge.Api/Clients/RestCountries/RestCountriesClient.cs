using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
            return responseData.Select(c => new Country { Name = c.Name, Flag = c.Flag,  Alpha3Code = c.Alpha3Code });
        }

        public async Task<CountryDetails> GetAsync(string code) {
            var top = await GetCountryDetailsAsync(code);
            var borderTasks = top.Borders.Select(c => GetCountryDetailsAsync(c));

            await Task.WhenAll(borderTasks);

            return new CountryDetails {
                Borders = borderTasks
                    .Select(t => t.Result)
                    .Select(c => new Country { Alpha3Code = c.Alpha3Code, Name = c.Name, Flag = c.Flag })
                    .ToArray(),
                Capital = top.Capital,
                Currencies = top.Currencies.Select(c => c.Name).ToArray(),
                Languages = top.Languages.Select(l => l.Name).ToArray(),
                Name = top.Name,
                Population = top.Population,
                TimeZones = top.Timezones,
                Alpha3Code = top.Alpha3Code
            };
        }

        private async Task<Contract.CountryDetails> GetCountryDetailsAsync(string code) {
            var response = await httpClient.GetAsync($"/rest/v2/alpha/{code}");
            if(!response.IsSuccessStatusCode) {
                throw new UpstreamException(response.RequestMessage.RequestUri, response.StatusCode);
            }

            return await response.ReadContentAsync<Contract.CountryDetails>();
        }
    }
}