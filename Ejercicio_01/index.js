// Instanciamos las dependencias
import mongoose, { mongo } from 'mongoose'

// Eliminar warning
mongoose.set('strictQuery', true);

// Insertar estudiantes a la colección
const estudiantes = [
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
    { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
    { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
    { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
    { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
    { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
    { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
    { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
    { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
    { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
]

/* Definir el esquema del documento y del modelo */
const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    apellido: {type: String, required: true},
    edad: { type: Number, required: true},
    dni: { type: String, required: true, unique: true },
    curso: { type: String, required: true},
    nota: { type: Number, required: true},
})

const EstudiantesDAO = mongoose.model('estudiantes', estudianteSchema)

/* Conexión a la base de datos */

await mongoose.connect('mongodb://127.0.0.1/colegio', {
    serverSelectionTimeoutMS: 5000,
})
console.log('Base de datos conectada')

/* Insertar datos a la base de datos */
const inserciones = []

for(const estudiante of estudiantes) {
    inserciones.push(EstudiantesDAO.create(estudiante))
}

const results = await Promise.allSettled(inserciones)
const rejected = results.filter(r => r.status == 'rejected')
if (rejected.length > 0) {
    console.log(`Hubo ${rejected.length} fallos`)
} else {
    console.log('Todo OK!')
}

await mongoose.disconnect()