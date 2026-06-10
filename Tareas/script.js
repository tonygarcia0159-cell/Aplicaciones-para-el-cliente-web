// Captura de elementos 
const formulario = document.getElementById("studentForm");
const tablaBody = document.querySelector("#tablaEstudiantes tbody");

// Evento principal del formulario
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Evitar que la página se recargue

    // 1. Captura manual de los valores de los inputs
    const cedula = document.getElementById("cedula").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const facultad = document.getElementById("facultad").value;
    const nivel = document.getElementById("nivel").value;
    const paralelo = document.getElementById("paralelo").value.trim();

    // Variable para controlar si todo está correcto
    let formularioValido = true;

    // 2. Bloque de Validaciones con Expresiones Regulares (RegEx)

    // Cédula: 10 números estrictos
    const regexCedula = /^\d{10}$/;
    if (!regexCedula.test(cedula)) {
        marcarError("cedula", "Formato incorrecto (requiere 10 dígitos).");
        formularioValido = false;
    } else {
        limpiarError("cedula");
    }

    // Apellidos y Nombres: Solo letras y espacios
    const regexLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    if (apellidos === "" || !regexLetras.test(apellidos)) {
        marcarError("apellidos", "Use solo letras.");
        formularioValido = false;
    } else {
        limpiarError("apellidos");
    }

    if (nombres === "" || !regexLetras.test(nombres)) {
        marcarError("nombres", "Use solo letras.");
        formularioValido = false;
    } else {
        limpiarError("nombres");
    }

    // Dirección: Que no esté vacía y tenga algo de texto
    if (direccion.length < 5) {
        marcarError("direccion", "Dirección muy corta (mínimo 5 caracteres).");
        formularioValido = false;
    } else {
        limpiarError("direccion");
    }

    // Teléfono: Formato celular Ecuador (09 + 8 dígitos)
    const regexTelefono = /^09\d{8}$/;
    if (!regexTelefono.test(telefono)) {
        marcarError("telefono", "Formato inválido (Ej: 09XXXXXXXX).");
        formularioValido = false;
    } else {
        limpiarError("telefono");
    }

    // Correo electrónico estándar
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        marcarError("email", "Correo electrónico no válido.");
        formularioValido = false;
    } else {
        limpiarError("email");
    }

    // Facultad
    if (facultad === "") {
        marcarError("facultad", "Seleccione una facultad de la lista.");
        formularioValido = false;
    } else {
        limpiarError("facultad");
    }

    // Nivel: Número entre 1 y 10
    if (nivel < 1 || nivel > 10 || nivel === "") {
        marcarError("nivel", "Rango de 1 a 10.");
        formularioValido = false;
    } else {
        limpiarError("nivel");
    }

    // Paralelo: 1 o 2 letras máximo
    const regexParalelo = /^[A-Za-z]{1,2}$/;
    if (!regexParalelo.test(paralelo)) {
        marcarError("paralelo", "Ej: A o B.");
        formularioValido = false;
    } else {
        limpiarError("paralelo");
    }

    // 3. Procesamiento si todo está OK
    if (formularioValido) {
        
        // Crear el objeto del estudiante
        const estudiante = {
            cedula: cedula,
            apellidos: apellidos,
            nombres: nombres,
            direccion: direccion,
            telefono: telefono,
            email: email,
            facultad: facultad,
            nivel: nivel,
            paralelo: paralelo.toUpperCase()
        };

        // Obtener lo que ya existe en LocalStorage
        let listaEstudiantes = localStorage.getItem("mis_estudiantes");
        
        if (listaEstudiantes === null) {
            listaEstudiantes = []; // Si está vacío, creamos un array nuevo
        } else {
            listaEstudiantes = JSON.parse(listaEstudiantes); // Si tiene datos, lo convertimos de JSON texto a Array
        }

        // Validar si la cédula ya se repite en el array
        let duplicado = false;
        for (let i = 0; i < listaEstudiantes.length; i++) {
            if (listaEstudiantes[i].cedula === estudiante.cedula) {
                duplicado = true;
                break;
            }
        }

        if (duplicado) {
            alert("Error: El número de cédula ya existe en los registros.");
            return;
        }

        // Agregar el nuevo estudiante al array
        listaEstudiantes.push(estudiante);

        // Guardar de vuelta en LocalStorage convirtiéndolo a texto JSON
        localStorage.setItem("mis_estudiantes", JSON.stringify(listaEstudiantes));

        // Limpiar el formulario y actualizar la vista
        formulario.reset();
        cargarTabla();
        alert("Estudiante guardado en LocalStorage.");
    }
});

// Funciones auxiliares para manejar los mensajes visuales de error
function marcarError(idCampo, mensaje) {
    const input = document.getElementById(idCampo);
    const spanError = document.getElementById("err-" + idCampo);
    input.classList.add("input-error");
    spanError.textContent = mensaje;
}

function limpiarError(idCampo) {
    const input = document.getElementById(idCampo);
    const spanError = document.getElementById("err-" + idCampo);
    input.classList.remove("input-error");
    spanError.textContent = "";
}

// 4. Función para leer LocalStorage y pintar la tabla
function cargarTabla() {
    tablaBody.innerHTML = ""; // Vaciar filas viejas
    
    let datos = localStorage.getItem("mis_estudiantes");
    if (datos !== null) {
        const estudiantes = JSON.parse(datos);
        
        // Recorrer el array e insertar las filas al HTML
        estudiantes.forEach(est => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td><b>${est.cedula}</b></td>
                <td>${est.apellidos}, ${est.nombres}</td>
                <td>${est.email}<br><span style="color:#888">${est.telefono}</span></td>
                <td>${est.facultad} - ${est.nivel}° '${est.paralelo}'</td>
            `;
            tablaBody.appendChild(fila);
        });
    }
}

// Ejecutar al cargar la página por primera vez para ver los datos guardados antes
cargarTabla();