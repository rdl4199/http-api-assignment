const http = require('http')
const url = require('url')

const query = require('querystring')

const htmlHandler = require('./htmlResponses.js')

const jsonHandler = require('./jsonResponses.js')

const port = process.env.port || process.env.NODE_PORT || 3000

//const urlStruct = {
//    '/'
//}