Feature: Home page
    As a general user
    I want to reach the homepage
    So that I know the site works.

    Scenario: Visiting the home page
        Given I am on the home page
        Then I should see "HydroZone"
        And I should see "API Token"

    Scenario: Entering an API Token
        Given I am on the home page
        And I enter "c3667b81-92a6-4913-b83c-64cc713cbc1e" into the token field
        Then I should see "Valid"
