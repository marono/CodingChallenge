using System;
using System.Net;

namespace Paymentsense.Coding.Challenge.Api {
    public class UpstreamException : ApplicationException {
        public Uri Url { get; }

        public HttpStatusCode HttpResultCode { get; }
        
        public UpstreamException(Uri url, HttpStatusCode httpResultCode) {
            this.Url = url;
            this.HttpResultCode = httpResultCode;
        }
    }
}