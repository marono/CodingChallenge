namespace Paymentsense.Coding.Challenge.Api.Contract {
    public class CountryDetails {
        public string  Alpha3Code { get; set; }
        public string Name { get; set; }
        public decimal Population { get; set; }
        public string[] TimeZones {  get; set; } = new string[0];
        public string[] Currencies { get; set; } = new string[0];
        public string Capital { get; set; }
        public string[] Languages { get; set; } = new string[0];
        public Country[] Borders { get; set; } = new Country[0];
    }
}