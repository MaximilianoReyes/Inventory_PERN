import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js Express / Typescript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    }, 
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://i.pinimg.com/564x/a4/3f/86/a43f867b341fc65810c3bc9456eb55ed.jpg');
            height: 120px;
            width: auto;
        }
    `
}

export default swaggerSpec
export {
    swaggerUiOptions
}