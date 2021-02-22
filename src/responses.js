const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, {
    'Content-Type': type,
  });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => respond(request, response, 200, index, 'text/html');

const getStyle = (request, response) => respond(request, response, 200, style, 'text/css');

const success = (request, response, acceptedTypes) => {
  const obj = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const xmlRes = `<response><message>${obj.message}</message></response>`;

    return respond(request, response, 200, xmlRes, 'text/xml');
  }
  const responseJSON = JSON.stringify(obj);

  return respond(request, response, 200, responseJSON, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  let code = 200;
  const obj = {
    message: 'This message has the required parameters.',
    id: 'badRequest',
  };
  if (!params.valid || params.valid !== 'true') {
    obj.message = 'Missing valid query parameter set to true.';
    code = 400;
  }

  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${obj.message}</message></response>`;

    return respond(request, response, code, responseXml, 'text/xml');
  }
  const responseJSON = JSON.stringify(obj);

  return respond(request, response, code, responseJSON, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  let code = 200;
  const obj = {
    message: 'You have successfully viewed the content.',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    obj.message = 'Missing loggedIn query parameter set to yes.';
    code = 401;
  }

  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${obj.message}</message></response>`;
    return respond(request, response, code, responseXml, 'text/xml');
  }
  const responseJSON = JSON.stringify(obj);
  return respond(request, response, code, responseJSON, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const obj = {
    message: 'You do not have access to this content.',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${obj.message}</message></response>`;
    return respond(request, response, 403, responseXml, 'text/xml');
  }
  const responseJSON = JSON.stringify(obj);
  return respond(request, response, 403, responseJSON, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const obj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${obj.message}</message></response>`;
    return respond(request, response, 404, responseXml, 'text/xml');
  }
  const responseJSON = JSON.stringify(obj);
  return respond(request, response, 404, responseJSON, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const obj = {
    message: 'Internal Server Error. Something went wrong.',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${obj.message}</message></response>`;
    return respond(request, response, 500, responseXml, 'text/xml');
  }
  const responseJSON = JSON.stringify(obj);
  return respond(request, response, 500, responseJSON, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const obj = {
    message: 'A get request for this page has not been implemented yet, Please check again later for updated content.',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${obj.message}</message></response>`;
    return respond(request, response, 501, responseXml, 'text/xml');
  }
  const responseJSON = JSON.stringify(obj);
  return respond(request, response, 501, responseJSON, 'application/json');
};

module.exports = {
  getIndex,
  getStyle,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
