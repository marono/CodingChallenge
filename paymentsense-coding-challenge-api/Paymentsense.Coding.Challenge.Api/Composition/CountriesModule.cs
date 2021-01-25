using Microsoft.Extensions.DependencyInjection;
using Paymentsense.Coding.Challenge.Api.Clients.RestCountries;

namespace Paymentsense.Coding.Challenge.Api.Composition {
    public static class CountriesModule {
        public static void AddCountriesSerices(this IServiceCollection serviceCollection) {
            serviceCollection.AddScoped<IRestCountriesClient, RestCountriesClient>();
            serviceCollection.AddHttpClient<IRestCountriesClient, RestCountriesClient>(client => {
                client.BaseAddress = new System.Uri("https://restcountries.eu");
            })
                .WithRetryPolicy()
                .WithCircuitBreakerPolicy();
        }
    }
}