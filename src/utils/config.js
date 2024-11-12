export const MONGODB_CNX_STR =
    'mongodb+srv://UserCoder:YzyzdHbr8N94AFkK@cluster0.ixumopf.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0';

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'documentacion',
            description: 'API pensada para clase de Swagger',
            version: '1.0.0',
        },
    },
    apis: [`src/docs/*.yaml`],
};
