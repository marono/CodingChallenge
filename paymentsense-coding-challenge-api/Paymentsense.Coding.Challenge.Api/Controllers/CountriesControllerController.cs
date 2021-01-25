using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Paymentsense.Coding.Challenge.Api.Clients.RestCountries;
using Paymentsense.Coding.Challenge.Api.Contract;

namespace Paymentsense.Coding.Challenge.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly IRestCountriesClient restCountriesClient;

        public CountriesController(IRestCountriesClient restCountriesClient)
        {
            this.restCountriesClient = restCountriesClient;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetAllAsync()
        {
            return Ok(await restCountriesClient.GetAllAsync());
        }
    }
}
