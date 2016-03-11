Feature: Dashboard
    As an authenticated user
    I want to select some zones and specify a time
    So that I can schedule portions of my yard to be watered

    Scenario: Attempting to reach the Dashboard unauthenticated
        Given I navigate directly to the dashboard
        Then I return to the home page

    Scenario: Visiting the Dashboard
        Given I am on the home page
        And I enter "c3667b81-92a6-4913-b83c-64cc713cbc1e" into the token field
        And I click the "submitToken" button
        Then I should see "Devices"

    Scenario: Selecting a Device
        Given I am on the dashboard
        And I select "device-0"
        Then I should see "Zones"

    Scenario: Selecting a Zone
        Given I am on the dashboard
        And I check "zone-0"
        Then I should see "Schedule"
