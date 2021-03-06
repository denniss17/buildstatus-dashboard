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

_note: in all commands below, you can also use `npm` instead of `yarn`._

Download or clone this repo:

    git clone https://github.com/denniss17/status-dashboard.git
  
Install and build the application:

    yarn install
    
This command first installs all dependencies, and then builds a production version of the react frontend app.
    
## Running

The dashboard can be started with:

    yarn start
    
Open your browser and go to http://localhost:3030

## Autostart on Raspberry PI

### Status-dashboard process

Add the following line to `/etc/rc.local` (replace paths of node and npm/yarn to your own path. I used nvm to manage the used node version):

    su - pi -c "cd /home/pi/status-dashboard && /home/pi/.nvm/versions/node/v6.11.0/bin/node /home/pi/.nvm/versions/node/v6.11.0/bin/yarn start &"

### Browser in full screen

Add the following lines to `~/.config/lxsession/LXDE-pi/autostart`:

    @xset s noblank
    @xset s off
    @xset -dpms
    @chromium-browser --kiosk http://localhost:3030


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

- [x] Fixed issues
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

You can run the backend and the ui as seperate instances. This allows to use the hot module replacement of the webpack 
configuration of `react-create-app`. To do so, you can execute in the `ui` directory:

    yarn start

By default, this opens the feathers backend on port 3030, and the react interface on port 3000.
