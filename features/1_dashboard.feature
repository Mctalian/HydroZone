Feature: Dashboard
    As an authenticated user
    I want to select some zones and specify a time
    So that I can schedule portions of my yard to be watered

    Scenario: Attempting to reach the Dashboard unauthenticated
        Given I navigate directly to the dashboard
        Then I return to the home page

    Scenario: Visiting the Dashboard
        Given I am on the dashboard
        Then I should see "Devices"

    Scenario: Selecting a Device
        Given I am on the dashboard
        And I click the "chooseDevice" button
        And I select "device-0"
        Then I should see "Zones"

    Scenario: Selecting a Zone
        Given I am on the dashboard
        And I select "zone-0"
        Then I should see "Setup Watering"

    Scenario: Scheduling zone watering
        Given I am on the dashboard
        And I select "zone-0"
        And I enter "1337" into the "duration" field
        And I click the "waterZones" button
        Then the element with id "loading" should be visible on the page

    Scenario: Selecting all zones
        Given I am on the dashboard
        And I click the "selectAllZones" button
        Then all zones should be selected

    Scenario: Clearing zone selection
        Given I am on the dashboard
        And I select "zone-0"
        And I click the "clearSelectedZones" button
        Then "zone-0" should be deselected
