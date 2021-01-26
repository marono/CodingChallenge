using System.Collections.Generic;
using System.Threading.Tasks;
using Paymentsense.Coding.Challenge.Api.Contract;

namespace Paymentsense.Coding.Challenge.Api.Clients.RestCountries {
    public interface IRestCountriesClient {
        Task<IEnumerable<Country>> GetAllAsync();
        Task<CountryDetails> GetAsync(string code);
    }
}