# API Documentation

## Endpoints

### 1. Energy prices

#### GET `/energy-prices`

Query energy prices over a specific time range.

- **Query Parameters**:
    - `from`: *(required)* The start of the time range in ISO 8601 format (e.g., `2023-11-15T20:00:00Z`).
    - `to`: *(required)* The end of the time range in ISO 8601 format (e.g., `2023-11-15T21:00:00Z`).

- **Example response**:

``` json
[
    {
        "valueExcVatInPence": 26.5,
        "valueIncVatInPence": 27.825,
        "validFrom": "2023-11-15T20:30:00Z",
        "validTo": "2023-11-15T21:00:00Z"
    },
    {
        "valueExcVatInPence": 29.9,
        "valueIncVatInPence": 31.395,
        "validFrom": "2023-11-15T20:00:00Z",
        "validTo": "2023-11-15T20:30:00Z"
    }
]
```

#### GET `/energy-prices/lowest`

Identify the lowest price within a given day.

- **Query Parameters**:
    - `date`: *(required)* The day to analyse in `YYYY-MM-DD` format (e.g., `2023-11-15`).

- **Example response**:

``` json
{
    "valueExcVatInPence": 26.5,
    "valueIncVatInPence": 27.825,
    "validFrom": "2023-11-15T20:30:00Z",
    "validTo": "2023-11-15T21:00:00Z"
}
```

#### GET `/energy-prices/highest`

Identify the highest price within a given day.

- **Query Parameters**:
    - `date`: *(required)* The day to analyse in `YYYY-MM-DD` format (e.g., `2023-11-15`).

- **Example response**:

``` json
{
    "valueExcVatInPence": 29.9,
    "valueIncVatInPence": 31.395,
    "validFrom": "2023-11-15T20:00:00Z",
    "validTo": "2023-11-15T20:30:00Z"
}
```

### 2. Household energy usage

#### GET `/household-energy-usage/total`

Query the total energy usage in kWh for a specific household over a given day.

- **Query Parameters**:
    - `householdType`: *(required)* The type of the household. Possible values are `STANDARD`, `HEAT_PUMP`, and
      `HEAT_PUMP_BATTERY`.

- **Example response**:

``` json
35.3
```

#### GET `/household-energy-usage/peak`

Identify peak energy usage time across all households.

- **Query Parameters**:
  - *None*

- **Example response**:

``` json
{
    "time": "02:30", 
    "usageInKwh": 5.6
}
```

### 3. Flexibility opportunities

#### GET `/flexibility-opportunities`

Retrieve times and prices where energy shifting/exporting is available.

- **Query Parameters**:
    - *None*

- **Example response**:

``` json
[
    {
        "startTime": "18:00",
        "endTime": "19:30",
        "pricePerKwh": 1.5
    },
    {
        "startTime": "02:00",
        "endTime": "04:00",
        "pricePerKwh": 0.5
    }
]
```

### 4. Insights

#### GET `/insights/total-energy-cost`

Retrieve the total energy cost in pence per day for a specific household.

- **Query Parameters**:
    - `householdType`: *(required)* The type of the household. Possible values are `STANDARD`, `HEAT_PUMP`, and
      `HEAT_PUMP_BATTERY`.
    - `date`: *(required)* The day to analyse in `YYYY-MM-DD` format (e.g., `2023-11-15`).

- **Example response**:

``` json
533.73
```

#### GET `/insights/potential-earnings`

Calculate how much a household could earn in pence per day if they participated in the flexibility market.

- **Query Parameters**:
    - `householdType`: *(required)* The type of the household. Possible values are `STANDARD`, `HEAT_PUMP`, and
      `HEAT_PUMP_BATTERY`.

- **Example response**:

``` json
765
```

## Notes

- All responses follow the `application/json` schema.
- All timestamps are represented in ISO 8601 format (`UTC` timezone).
- Currency amounts are represented in pence (`1` = £0.01).
