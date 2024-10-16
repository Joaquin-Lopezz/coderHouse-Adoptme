
class CustomError {
    static crearError({nombre = "Error", causa = "desconocido", mensaje, codigo = 1}){
        const error = new Error(mensaje); 
        error.name = nombre;
        error.causa = causa; 
        error.code = codigo;
        throw error; 
        //Lanzamos el error, esto detiene la ejecución, por eso debemos capturarlo. 
    }

}

export default CustomError; 