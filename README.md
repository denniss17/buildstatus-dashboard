# Status dashboard

This is a dashboard which combines two data streams into a single dashboard:

- List of issues from an issue tracker based on some filter (Jira)
- List of build statuses from a CI system for the collected issues (Jenkins)

## Configuration

### Issue tracker

#### Jira

Jira offers a REST API to to fetch a list of issues which match a certain filter.
