import { EErrors } from '../services/errors/enum.js';

const manejadorError = (error, req, res, next) => {

    switch (error.code) {
        case EErrors.TIPO_INVALIDO:
            res.status(400).send({
                status: 'error',
                error: error.name,
                causa: error.causa,
                message: 'Tipo inválido proporcionado.',
            });
            break;

        case EErrors.RUTA_ERROR:
            res.status(404).send({
                status: 'error',
                error: error.name,
                causa: error.causa,
                message: 'Ruta no encontrada.',
            });
            break;

        case EErrors.NOT_FOUND:
            res.status(404).send({
                status: 'error',
                error: error.name,
                causa: error.causa,
                message: 'Recurso no encontrado.',
            });
            break;

        case EErrors.BAD_REQUEST:
            res.status(400).send({
                status: 'error',
                error: error.name,
                causa: error.causa,
                message: 'Solicitud incorrecta.',
            });
            break;

        case EErrors.BD_ERROR:
            res.status(500).send({
                status: 'error',
                error: error.name,
                causa: error.causa,
                message: 'Error interno del servidor.',
            });
            break;

        case EErrors.Unauthorized:
            res.status(401).send({
                status: 'error',
                error: error.name,
                causa: error.causa,
                message: 'No autorizado.',
            });
            break;

        case EErrors.CONFLICT:
            res.status(409).send({
                status: 'error',
                error: error.name,
                causa: error.causa,
                message: 'Conflicto en la solicitud.',
            });
            break;

        default:
            res.status(500).send({
                status: 'error',
                error: 'Error desconocido',
                message: 'Ocurrió un error inesperado en el servidor.',
            });
    }
};

export default manejadorError;
