import { EErrors } from '../services/errors/enum.js';

const manejadorError = (error, req, res, next) => {
    console.log(error.causa);
    switch (error.code) {
        case EErrors.TIPO_INVALIDO:
            res.send({ status: 'error', error: error.name });
            break;
        case EErrors.RUTA_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case EErrors.NOT_FOUND:
            res.send({ status: 'error', error: error.name });
            break;
        case EErrors.BAD_REQUEST:
            res.send({ status: 'error', error: error.name });
            break;
        case EErrors.BD_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case EErrors.Unauthorized:
            res.send({ status: 'error', error: error.name });
            break;
        case EErrors.CONFLICT:
            res.send({ status: 'error', error: error.name });
            break;
        default:
            res.send({
                status: 'error',
                error: 'Error desconocido, moriremos!',
            });
    }
};

export default manejadorError;
