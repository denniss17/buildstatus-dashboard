import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import request from 'request';

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : `${window.location.protocol}//${window.location.host}`;

// Setup feather app
const app = feathers().configure(rest(serverUrl).request(request));

export const issueProviders = app.service('issueProviders');
export const statuses = app.service('statuses');
export const info = app.service('info');

export default app;
