import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Agrosis API", 
            version: "1.0.0",
            description: "Documentación de la API de Agrosis",
            contact:{
                name: 'Grupo 4, Lider  => Dilson Chimborazo :p'
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de desarrollo",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Ingresa tu token JWT en el campo de autorización. Usa el formato: Bearer <token>"
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    apis: ["src/routers/**/*.js"], 
};


const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;



