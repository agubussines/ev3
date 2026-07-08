window.onload = function () {
    obtenerUsuarios();
}

async function obtenerUsuarios() {
    try {
        const respuesta = await fetch('http://localhost:3000/obtenerUsuarios');
        const usuarios = await respuesta.json();

        new DataTable('#tablaUsuarios', {
            data: usuarios,
            columns: [
                { data: 'nombre' },
                { data: 'correo' },
                {
                    data: 'genero',
                    'render': function (data, type, row) {
                        let respuesta = '';
                        switch (data) {
                            case 'masc':
                                respuesta = 'Masculino';
                                break;
                            case 'fem':
                                respuesta = 'Femenino';
                                break;
                            case 'otro':
                                respuesta = 'Otro';
                                break;
                        }
                        return respuesta;
                    }
                },
                { data: 'fechaNacimiento' },
                { data: 'gentilicio[0].nombre' }
            ]
        });
    } catch (error) {
        console.log('Error al obtener los datos: ', error)
    }
}

function cargarGenero(genero) {
    respuesta = '';
    switch (genero) {
        case 'masc':
            respuesta = 'Masculino';
        case 'fem':
            respuesta = 'Femenino';
        case 'otro':
            respuesta = 'Otro';
    }
    return respuesta;
}

async function cargarListadoMascotas() {
    try {
        const respuesta = await fetch('http://localhost:3000/obtenerMascotas');
        const mascotas = await respuesta.json();
        
        const tbody = $('#tablaMascotas');
        tbody.empty();

        $.each(mascotas, function (index, mascota) {
            // Se extrae el nombre del dueño gracias a la agregación $lookup
            let nombreDueno = mascota.datosDelDueno ? mascota.datosDelDueno.nombre : 'Sin dueño';

            let fila = `
                <tr>
                    <td class="fw-bold text-primary">${nombreDueno}</td>
                    <td>${mascota.nombre || '-'}</td>
                    <td>${mascota.especie || '-'}</td>
                    <td>${mascota.raza || '-'}</td>
                    <td>${mascota.edad || 0} años / ${mascota.peso || 0} kg</td>
                    <td>${mascota.sexo || '-'}</td>
                    <td>${mascota.observaciones || '-'}</td>
                </tr>
            `;
            tbody.append(fila);
        });

    } catch (error) {
        console.log('Error al obtener las mascotas: ', error);
        alert('Hubo un problema al cargar los datos.');
    }
}