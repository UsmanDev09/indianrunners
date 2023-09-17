import { Express, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import logger from '../config/logger'
import { version } from '../package.json' 
import activityRoutes from '../routes/activity'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version, 
        },
    },
    apis: ['./routes/*.ts'], // Use a wildcard pattern to include all .ts files in the routes directory
}
const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Export in JSON format
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    logger.info(`Docs available at http:localhost:${port}/docs`)
}


export default swaggerDocs;