# Back-end Framework

- Status: [accepted]
- Deciders: @glandre
- Date: 2021-08-21

## Context and problem statement

Simple HR App is a new project, and accordingly, it needs a back-end. This ADR documents the research that was done in order to decide what this back-end will look like.

The initial desires of the engineer were the following:

- Use Laravel (or Lumen) framework: because it's a modern framework and due to previous experience of the engineer with it;
- Implement the back-end of the app as an API (either REST or GraphQL);
- Use GraphQL if possible.

P.s.: The [Lumen Framework](https://lumen.laravel.com/docs/8.x) (also developed by the Laravel team), was briefly considered, as it is a lightweight option and is very similar to Laravel.
Laravel was favoured however, due to its completeness. There are some Laravel libraries that are not supported by Lumen (https://lumen.laravel.com/docs/8.x#compatibility).
Because the project has a very limited timeline, it is better to avoid any surprises.

## Decision Drivers

The following factors were considered during this research:

- Adoption of modern tools and patterns;
- Software development speed;
- Project maintenance;
- Application scalability.

## Considered Options

Based on the research done during the time this ADR was written. Three main approaches were considered: RESTful API using Laravel, GraphQL API using Laravel GraphQL, and a Hybrid of RESTful + GraphQL API.

### Option 1: RESTful API (Laravel or Lumen)

https://laravel.com/docs/8.x

This is the safe option

PRO: Well-documented
PRO: Default approach adopted in the Laravel Framework (simpler and less risky)
PRO: Probably easier to comply with the No-ORM rule

CON: Losing an opportunity of taking advantages of the power of GraphQL (read more [here](https://www.altexsoft.com/blog/engineering/graphql-core-features-architecture-pros-and-cons/#:~:text=part%20of%20it.-,GraphQL%20advantages%20and%20disadvantages%20compared%20to%20REST,-As%20they%20are))

### Option 2: GraphQL API (Laravel GraphQL)

https://github.com/rebing/graphql-laravel

PRO: GraphQL

CON: Types creation seem laborious
CON: Works directly with the ORM (violates the No-ORM rule)
CON: The adoption of this approach adds several uncertainties to the project which can result in delay

### Option 3: Hybrid/Progressive (Laravel + graphql-php)

https://webonyx.github.io/graphql-php/

PRO: Staged approach - Start with a RESTful API and add GraphQL capabilities at a later point.
PRO: Possible to take advantage of the standard RESTful capabilities
PRO: About It doesn't dictate how these layers are implemented or which storage engines are used. Instead, it provides tools for creating rich API for your existing app
PRO: graphql-php is recommended in https://graphql.org/code/#php and it seems to be the most lightweight option there
PRO: graphql-php is likely to be stable and well-tested: The first version of this library (v0.1) was released on August 10th 2015.

## Decision outcome

A **progressive** adoption of **Option 3** is recommended: **Laravel + graphql-php**.

The approach will be the following:

1. To build the Laravel back-end API infrastructure
2. Add Authentication to the API
3. Validate the infrastructure with a few endpoints
4. Determine a time-boxed period (e.g., 2 hours) to spend setting up the GraphQL structure by following this guide: https://webonyx.github.io/graphql-php/getting-started/
5. If 2 hours are not enough, stop and continue the project without GraphQL in order not to compromise the scope.

**Notice:** Even though using GraphQL is a desire of the developer, it is not in the requirements, so its adoption should not impact the deadline of the project.
