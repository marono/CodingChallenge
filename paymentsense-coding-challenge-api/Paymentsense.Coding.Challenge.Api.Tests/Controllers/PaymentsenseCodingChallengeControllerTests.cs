using System.Threading.Tasks;
using Bogus;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Paymentsense.Coding.Challenge.Api.Clients.RestCountries;
using Paymentsense.Coding.Challenge.Api.Contract;
using Paymentsense.Coding.Challenge.Api.Controllers;
using Xunit;

namespace Paymentsense.Coding.Challenge.Api.Tests.Controllers
{
    public class CountriesControllerTests
    {
        private readonly Mock<IRestCountriesClient> restCountriesClientMock = new Mock<IRestCountriesClient>();
        private readonly CountriesController Subject;
        private readonly Faker<Country> countryFaker = new Faker<Country>()
            .StrictMode(true)
            .RuleFor(t => t.Name, v => v.Random.String(10));


        public CountriesControllerTests()
        {
            Subject = new CountriesController(restCountriesClientMock.Object);
        }

        [Fact]
        public async Task GetAdd_returns_countries()
        {
            var countries = countryFaker.Generate(10);
            restCountriesClientMock.Setup(s => s.GetAllAsync()).ReturnsAsync(countries);

            var result = (await Subject.GetAllAsync()).Result as OkObjectResult;

            result.StatusCode.Should().Be(StatusCodes.Status200OK);
            result.Value.Should().Be(countries);
        }
    }
}
