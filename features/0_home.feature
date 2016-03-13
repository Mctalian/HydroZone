Feature: Home page
    As a general user
    I want to enter my API Key first
    So that I can take advantage of all the cool features.

    Scenario: Visiting the home page
        Given I am on the home page
        Then I am on the "Sign In" page
        And I should see "HydroZone"
        And I should see "API Token"

    Scenario: Entering an invalid API Token
        Given I am on the home page
        And I enter "zqwplkmx-92a6-4913-b83c-64cc713cbc1e" into the token field
        Then the element with id "invalidKey" should be visible on the page

    Scenario: Submitting a valid API Token
        Given I am on the home page
        And I enter "c3667b81-92a6-4913-b83c-64cc713cbc1e" into the token field
        Then I am on the "Dashboard" page
