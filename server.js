const express = require('express')
const bodyParse = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./schema')
require('./db/setup')


const app = express()

app.use(
    '/graphql',
    bodyParse.json(), 
    graphqlExpress({schema})
)

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql'
    })
)

const PORT = 5678
app.listen(PORT, () => {
    console.log('Server ON')
})