namespace Paymentsense.Coding.Challenge.Api.Clients.RestCountries.Contract {
    public class CountryDetails {
        public string Name { get; set; }
        
        public decimal Population { get; set; }
        
        public string[] Timezones {  get; set; } = new string[0];
        
        public NamedEntity[] Currencies { get; set; } = new NamedEntity[0];
        
        public string Capital { get; set; }
        
        public NamedEntity[] Languages { get; set; } = new NamedEntity[0];
        
        public string[] Borders { get; set; } = new string[0];
        
        public string Alpha3Code { get; set; }

        public string Flag { get; set; }
    }
}