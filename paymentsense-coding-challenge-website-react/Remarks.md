# Remarks

* I haven't added any service layer / orchestrator or domain to the API as the requirements were simple enough to be able to orchastrate all the flow in the controller. In my experience for microservices the flows are straight forward enough that most of the time and mandating a services layer for each controller bloats the code.

* I have however separated the API contract from the client contract so that they can vary individually.

* Normally I'd have an integration test project for the server side, which I ran out of time so didn't add here. I favour an interted test pyramid for APIs where as much as possible is tests as an integration test and unit tests are used for scenarios where integration tests are difficult to write. This gives me a very good level of trust in the code + a good safety net for refactorings further down the line.

* Swagger

* Request logging

* Added Poly retries and circuit breaker

* Added error handling middleware

* As I was running out of time I've only included one set of tests for the selectors / epics and those are in the HealthStatus module.

* Didn't add paging validation on the server side, my favourite approach would be FluentValidator. Also there's no vlaidation for the country details.

* Should implement request cancellation when user navigates somewhere else and a a countries/country details load is already in progress.
