using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Paymentsense.Coding.Challenge.Api.Clients.RestCountries;
using Paymentsense.Coding.Challenge.Api.Contract;

namespace Paymentsense.Coding.Challenge.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly static Regex RangeRegex = new Regex(@"^items=(?<start>\d+)-(?<end>\d+)$", RegexOptions.Compiled | RegexOptions.CultureInvariant | RegexOptions.IgnoreCase);
        private readonly IRestCountriesClient restCountriesClient;

        public CountriesController(IRestCountriesClient restCountriesClient)
        {
            this.restCountriesClient = restCountriesClient;
        }

        [ResponseCache(Duration = 10, VaryByHeader = "Range")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetAllAsync([FromHeader(Name = "Range")]string range)
        {
            var startIndex = 0;
            var endIndex = Int32.MaxValue;
            Match match;


            if(!String.IsNullOrWhiteSpace(range) && (match = RangeRegex.Match(range)).Success) {
                startIndex = Int32.Parse(match.Groups["start"].Value);
                endIndex = Int32.Parse(match.Groups["end"].Value);
            }

            var countries = await restCountriesClient.GetAllAsync();
            var page = countries
                .Skip(startIndex)
                .Take(endIndex-startIndex+1);

            Response.Headers.Add("Content-Range", $"items {startIndex}-{startIndex+page.Count()-1}/{countries.Count()}");

            return Ok(page);
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<CountryDetails>> GetAsync(string code) {
            return Ok(await restCountriesClient.GetAsync(code));
        }
    }
}
