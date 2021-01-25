using System;
using System.Net.Http;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;

namespace Paymentsense.Coding.Challenge.Api.Composition {
    public static class HttpModule {
        public static IHttpClientBuilder WithRetryPolicy(this IHttpClientBuilder builder) => builder.AddPolicyHandler(
            HttpPolicyExtensions.HandleTransientHttpError()
                .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
                .WaitAndRetryAsync(6, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)))
        );

        public static IHttpClientBuilder WithCircuitBreakerPolicy(this IHttpClientBuilder builder) => builder.AddPolicyHandler(
            HttpPolicyExtensions.HandleTransientHttpError()
                .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30))
        );
    }
}