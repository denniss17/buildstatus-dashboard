# Status dashboard 📊🚦

Dashboard for displaying the status and progress of your project.

Demo: https://buildstatus-dashboard.herokuapp.com/

## Introduction

This is a dashboard which combines the current scope of your project with the build statuses of your CI deployment 
to create a visual overview of the status of your project.

Basically, it combines two flow of data into a single dashboard:

- A list of issues which represent the current scope (sprint, milestone) of your project 
- The list of build statuses from a CI deployment (Jenkins, Travis, CircleCI) for these collected issues.

## Installation

Download or clone this repo:

    git clone https://github.com/denniss17/status-dashboard.git
  
Install and build the application:

    yarn install
    
or

    npm install
    
## Running

The dashboard can be started with:

    NODE_ENV=production yarn start
    
or

    NODE_ENV=production npm start
    
Open your browser and go to http://localhost:3030

## Configuration

The configuration can be found in `/config`. You can either edit `production.json`, or create a `local.json` file.

TODO Add basic configuration here.

### General

#### host

The hostname of the dashboard. Defaults to `localhost`

#### port

The port used by the dashboard. Defaults to `3030`

### issues

TODO

Supported:

- [x] Jira
- [ ] Github
- [ ] Bitbucket

### statuses

TODO

Supported:

- [x] Jenkins
- [ ] Travis CI
- [ ] CircleCI

## Development

TODO
