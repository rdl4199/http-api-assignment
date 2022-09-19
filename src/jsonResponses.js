const respondJSON = (request, response,status, object) => {
    response.writeHead(status, {'Content-Type': 'application/json'})
    console.log(JSON.stringify(object))
    response.write(JSON.stringify(object))

    response.end()
}

const success = (request, response, acceptedType) => {
    const responseJSON = {
        message: 'This is a successful response',
        id: 'success'
    }
    if(acceptedType[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 200, responseXML, 'text/xml')
    }
    respondJSON(request, response, 200, responseJSON)
}

const forbidden = (request, response,acceptedType) => {
    const responseJSON = {
        message: 'Unauthorized Request',
        id: 'forbidden'
    }
    if(acceptedType[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 500, responseXML, 'text/xml')
    }
    respondJSON(request, response, 403, responseJSON, 'application/json')
}

const internal = (request, response, acceptedType) => {
    const responseJSON = {
        message: 'There was a problem with the server',
        id: 'internal'
    }
    if(acceptedType[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 500, responseXML, 'text/xml')
    }
    return respondJSON(request, response, 500, responseJSON, 'application/json')
}

const notImplemented = (request, response, acceptedType) => {
    const responseJSON = {
        message: 'This page has not been implemented yet',
        id: 'notImplemented'
    }
    if(acceptedType[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 501, responseXML, 'text/xml')
    }
    respondJSON(request, response, 501, responseJSON, 'application/json')
}

const badRequest = (request, response, params, acceptedType) => {
    const responseJSON = {
        message: 'This request has the required parameters'
    }
    if(!params.valid || params.valid !== 'true') {
        if(acceptedType[0] === 'text/xml')
        {
            responseXML = `${responseXML} <message>Missing valid query parameters set to true</message>`;
            responseXML = `${responseXML} <id>unathorized</id>`;
            responseXML = `${responseXML} </response>`;
            return respondJSON(request, response, 401, responseXML, 'text/xml')
        }
        responseJSON.message = 'Missing valid query parameters set to true';
        responseJSON.id = 'badRequest'
        return respondJSON(request , response, 400, responseJSON, 'application/json')
    }
    return respondJSON(request, response, 200, responseJSON)
}

const unauthorized = (request, response, acceptedType, params) => {
    const responseJSON = {
        message: 'This request has the required parameters',
        id: 'unauthorized'
    }

    if(!params.loggedIn || params.loggedIn !== 'yes') {
        if(acceptedType[0] === 'text/xml')
        {
            responseXML = `${responseXML} <message>Missing valid query parameters set to true</message>`;
            responseXML = `${responseXML} <id>unathorized</id>`;
            responseXML = `${responseXML} </response>`;
            return respondJSON(request, response, 401, responseXML, 'text/xml')
        }
        else
        {
            responseJSON.message = 'Missing valid query parameters set to true';
            responseJSON.id = 'unauthorized'
            return respondJSON(request , response, 401, responseJSON, 'application/json')
        }
    }
    return respondJSON(request, response, 200, responseJSON)
}

const notFound = (request, response, acceptedType) => {
    const responseJSON = {
        message : 'The page you are looking for was not found.',
        id: 'notFound',
    }
    if(acceptedType[0] === 'text/xml')
    {
        responseXML = `${responseXML} <message>Missing valid query parameters set to true</message>`;
        responseXML = `${responseXML} <id>unathorized</id>`;
        responseXML = `${responseXML} </response>`;
    }
    respondJSON(request, response, 404, responseJSON)
}

module.exports = {
    success,
    badRequest,
    notFound,
    unauthorized,
    forbidden,
    internal,
    notImplemented
}