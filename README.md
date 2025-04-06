# Energy coding challenge

A server and a client application for visualising some energy data.

## Table of Contents

- [API documentation](#api-documentation)
- [Setup and Running the Solution](#setup-and-running-the-application)
- [Assumptions Made](#assumptions-made)
- [Trade-offs and Design Choices](#trade-offs-and-design-choices)
- [Potential Improvements for Production](#potential-improvements-for-production)

## API documentation

You can find the API documentation [here](API_DOCUMENTATION.md).

## Setup and running the application

### Prerequisites

- Node.js (v20.10.0+)
- npm (v10.2.3+)

### Installation steps

1. Clone the repository:

``` bash
   git clone git@github.com:louisdg/energy-coding-challenge.git
```

2. Navigate to the project directory:

``` bash
   cd energy-coding-challenge/
```

3. Install server dependencies:

``` bash
   # supposing you are in the root folder
   cd client/
   npm install
```

3. Install client dependencies:

``` bash
   # supposing you are in the root folder
   cd server/
   npm install
```

### Running the server

- To run the server in development mode (runs on http://localhost:3000/):

``` bash
   # supposing you are in the server/ folder
   npm run dev
```

- To run the unit tests:

``` bash
   # supposing you are in the server/ folder
   npm run test
```

### Running the client

- To run the client in development mode (runs on http://localhost:5173/):

``` bash
   # supposing you are in the client/ folder
   npm run dev
```

- To run the the unit tests:

``` bash
   # supposing you are in the client/ folder
   npm run test
```

## Assumptions made

1. **Energy prices**
    - For the energy prices, I used the provided `agile_price_example.json` instead of directly querying the API, saving
      me a bit of time to focus on testing the app, making it modular, and more readable. I went with the assumption
      that prices such as `value_exc_vat` and `value_inc_vat` were given in pence.

2. **Household energy usage data**
    - The `household_usage.csv` file was taken as complete and correctly formatted. I went with the assumption that
      `Standard_Household`, `HeatPump_Household`, and `HeatPump_Battery_Household` represented the daily energy used in
      kWh for each type of household, recorded at 30 minute intervals.

3. **Flexibility market data**
    - After a bit of research such as documents like [this one](https://www.neso.energy/document/189851/download), I
      went with the assumption that `flexibility_market.json` represented times in the day when there are opportunities
      to make money by either consuming less energy, or more. I assumed that:
        - the `demand_turn_down` events ask to reduce energy consumption at times when there is too high demand in the
          grid, thus rewarding lower consumption.
        - the `demand_turn_up` events represent the opposite, which is that there is too low demand in the grid, thus
          rewarding higher consumption.

    - I assumed that `min_flexibility_kWh` is the minimum amount of kWh to add to/remove from energy consumption to
      participate in the event, and that `max_flexibility_kWh` was the maximum amount of kWh that would be rewarded for
      participating.
    - I went with the assumption that `price_per_kWh` is represented in pence (At first, I went with
      pounds. But the values looked too high. So I finally went with pence. But now they look too low... We'll go with
      that anyway.).

4. **Time formats**
    - I assumed the times in the datasets all follow the same 24-hour clock and are in the same time zone (UTC).

## Trade-offs and design choices

### Tools and technologies

For the server, I chose Node.js and Express because they’re lightweight, familiar tools that allowed me to focus
on implementing the requirements by letting me build an API without much boilerplate. These tools are also
relatively efficient for processing data.

I went with React for the client because it is also a technology I'm familiar with. I do believe it is a library
of choice to build robust, scalable, modular, and testable frontends. I used Material UI libraries to help speed the
development, enable scalable theming, and improve user accessibility, including visually impaired users or users without
mice.

By using the same language across the entire stack, less time was spent context-switching during development.

I also used TypeScript to ensure type safety and improve the reliability of the codebase. It provides a clear
contract for API inputs and outputs by typing methods and variables. It helps to find problems at compile time instead
of at runtime. As a trade-off, I spend a bit more time doing some project configuration, especially when adding test
libraries, compilers, or transpilers, but in exchange, it helps to avoid the eternal problems of dealing with pure JS
and wondering why *that* variable is an object when it should instead be a string.

I used ESLint and Prettier to give me opinionated formatting and not have to worry about code formatting rules.

### Testing and TDD

I used Jest for testing, as it provides a simple and complete testing solution out of the box. The automated
tests made it easy for me to assure the behaviour of the app while iterating on the challenge. The entirety (or
most) of the project is tested. There are a couple of cases that I left out because they would take me more
investigation and time to make work, but I deemed not worth it in such a short time and project size.

I went with TDD for the majority of this project, because I felt it represents better what I can do as a
professional developer. I sacrificed a bit of time and development speed in the short run, but in return, I build
a software that designs itself, that I have confidence in its behaviour, that is easier to read, and that is more
scalable.

### Data handling

JSON files are directly loaded into memory, and the CSV file is parsed at runtime every time the data is needed,
so once per endpoint call. Obviously, in a large-scale production setting, this would not be acceptable for
performance and scalability. But in a project of this size, it helps with iterating faster.

### API design

I opted for a simple RESTful API that provides endpoints to perform specific queries like energy prices over a time
range and calculating household costs. This decision made the API easy to use and focused on the challenge
requirements.

### Error handling

On the server side, I included basic error handling for invalid API queries, such as missing or invalid
parameters, with the help of the `express-validator` library, and return 400 status codes in that case.

In the case where an error would be thrown for inside of one of the services, I unfortunately had to spend less
time handling these cases, in a project like this where time is limited. With more time, I would have added better
error handling with middleware for times when services throw errors.

### Time constraints

Given the limited time for development, I focused on implementing the core API features on the server side, and
some nice visualisation on the client side. I only ran the server and client in development mode, and haven't
tried building the apps as they don't need to be deployed.

## Potential improvements for production

- **Testing**
    - Add integration and end-to-end tests
    - Test more edge cases, such as unexpected API responses or network errors

- **Scalability**
    - Use a tool such as Nx to enhance monorepo management by optimising builds, task running, and dependency control,
      instead of having to handle the server and client as two completely separate entities

- **Data handling**
    - Use the Octopus Agile API instead of querying the `agile_price_example.json` file
    - Switch to a dedicated database or cache for lookup performance instead of relying on the file system, parsing, and
      services filtering the data

- **Deployment**
    - Set up CI/CD pipelines to automatically test, build, and deploy the software
    - Prepare for cloud deployment
    - Use containerisation for the project

- **Monitoring and security**
    - Use monitoring tools for logging/analytics
    - Consider security improvements like input sanitisation, authentication & authorization mechanisms

- **UI/UX**
    - Make the interface mobile-friendly by increasing responsiveness
    - Add the option to sort/filter data where necessary
    - Use more charts for visualising relevant data, such as bar charts or pie charts
    - Add better loading feedback with loader animations
    - Add better error feedback with snackbar notifications
    - Improve accessibility by ensuring standards are met, that interactive elements are accessible and that users that
      use screen readers can navigate the app