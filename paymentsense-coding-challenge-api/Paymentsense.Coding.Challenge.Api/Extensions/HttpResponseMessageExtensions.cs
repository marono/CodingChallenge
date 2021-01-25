using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Extensions {
    public static class HttpResponseMessageExtenions {
        private static JsonSerializerOptions options = new JsonSerializerOptions {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
        public static async Task<T> ReadContentAsync<T>(this HttpResponseMessage response) {
            return await JsonSerializer.DeserializeAsync<T>(await response.Content.ReadAsStreamAsync(), options);
        }
    }
}