using Microsoft.AspNetCore.Builder;
using Paymentsense.Coding.Challenge.Api.Middlewares;

namespace Paymentsense.Coding.Challenge.Api.Extensions {
    public static class ApplicationExtensions {
        public static IApplicationBuilder UseErrorHandler(this IApplicationBuilder app) {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            return app;
        }
    }
}