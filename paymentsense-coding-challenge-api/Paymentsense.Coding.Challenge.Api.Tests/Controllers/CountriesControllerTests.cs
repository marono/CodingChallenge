using System.Collections.Generic;
using System.Linq;
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
            .RuleFor(t => t.Name, v => v.Lorem.Word())
            .RuleFor(t => t.Flag, v => v.Lorem.Word())
            .RuleFor(t => t.Alpha3Code, v => v.Random.String(3));


        public CountriesControllerTests()
        {
            Subject = new CountriesController(restCountriesClientMock.Object);
            Subject.ControllerContext.HttpContext = new DefaultHttpContext();
        }

        [Fact]
        public async Task GetAdd_returns_countries()
        {
            var countries = countryFaker.Generate(10);
            restCountriesClientMock.Setup(s => s.GetAllAsync()).ReturnsAsync(countries);

            var result = (await Subject.GetAllAsync("items=0-5")).Result as OkObjectResult;

            result.StatusCode.Should().Be(StatusCodes.Status200OK);
            (result.Value as IEnumerable<Country>).Should().ContainInOrder(countries.Take(6));
            Subject.Response.Headers["Content-Range"].Should().Equal($"items 0-5/10");
        }
    }
}
