const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const casual = require('casual')
const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')


const typeDefs = `

    # Curso del Sistema
    type Curso {
        id: ID!
        titulo: String!
        # Descripcion del curso
        descripcion: String!
        profesor: Profesor
        rating: Float @deprecated(reason: "No creemos mas en los puntajes")
        comentarios: [Comentario]
    }

    type Profesor {
        id: ID!
        nombre: String!
        nacionalidad: String!
        genero: Genero
        cursos: [Curso]
    }

    enum Genero {
        MASCULINO
        FEMENINO
    }

    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }

    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
    }

`

const resolvers = {
    Query: {
        cursos: () => Curso.query().eager('[profesor, comentarios]'),
        profesores: () => Profesor.query().eager('cursos'),
        curso: (rootValue, args) => Curso.query().findById(args.id).eager('[profesor, comentarios]'),
        profesor: (rootValue, args) => Profesor.query().findById(args.id).eager('cursos')
    }
}

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})

var i = 0
var idGenerator = () => {
    return i++;
}
/*
addMockFunctionsToSchema({
    schema: schema,
    mocks: {
        Curso: () => {
            return {
                id: idGenerator(),
                titulo: casual._title,
                descripcion: casual.text
            }
        },
        Profesor: () => {
            return {
                nombre: casual.name,
                nacionalidad: casual.country
            }
        }
    },
    preserveResolvers: true
})
*/

module.exports = schema