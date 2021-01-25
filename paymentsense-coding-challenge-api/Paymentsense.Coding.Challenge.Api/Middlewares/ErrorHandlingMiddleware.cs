using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Paymentsense.Coding.Challenge.Api;

namespace Paymentsense.Coding.Challenge.Api.Middlewares {
    public class ErrorHandlingMiddleware {
        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next) {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context) {
            try {
                await next(context);
            }
            catch(UpstreamException) {
                context.Response.StatusCode = (int)HttpStatusCode.BadGateway;
            }
            catch(Exception) {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }
        }
    }
}