// Función para mostrar advertencias con SweetAlert
const mostrarAdvertencia = (mensaje) => {
    Swal.fire({
        icon: 'error', // Tipo de alerta (error)
        title: 'Advertencia', // Título de la advertencia
        text: mensaje, // Mensaje que se mostrará
        confirmButtonText: 'Aceptar' // Texto del botón para aceptar
    });
};

// Función para convertir notación polaca (preorden) a expresión matemática
const convertirAPostorden = (expresion) => {
    const elementos = expresion.split(/\s+/); // Separa la expresión en elementos (números y operadores) usando espacios
    const elementosGuardados = []; // Array para almacenar los elementos procesados

    // Recorremos los elementos de la expresión de derecha a izquierda
    for (let i = elementos.length - 1; i >= 0; i--) {
        const elementoActual = elementos[i]; // Tomamos el elemento actual

        // Si el elemento es un operador (+, -, *, /)
        if (['+', '-', '*', '/'].includes(elementoActual)) {
            const operando1 = elementosGuardados.shift(); // Tomamos el primer operando
            const operando2 = elementosGuardados.shift(); // Tomamos el segundo operando
            const subExpresion = `(${operando1} ${elementoActual} ${operando2})`; // Creamos la subexpresión
            elementosGuardados.unshift(subExpresion); // Guardamos la subexpresión en el inicio
        } else {
            elementosGuardados.unshift(elementoActual); // Si es un número, lo guardamos
        }
    }

    return elementosGuardados[0]; // Retornamos la expresión completa
};

// Función para generar la expresión matemática y el resultado
const generarExpresionMatematica = () => {
    const expresion = document.getElementById('expresion').value.trim(); // Obtener expresión del campo de texto

    // Validamos la expresión antes de continuar
    if (!validarExpresionPolaca(expresion)) return; // Si no es válida, no hacemos nada más

    // Limpiamos los resultados anteriores de la pantalla
    document.getElementById('expresionMatematica').textContent = ''; // Limpiamos el área de la expresión
    document.getElementById('resultado').textContent = ''; // Limpiamos el área del resultado

    // Convertimos la notación polaca a expresión matemática
    const expresionMatematica = convertirAPostorden(expresion); 
    document.getElementById('expresionMatematica').textContent = expresionMatematica; // Mostramos la expresión convertida

    // Evaluamos la expresión matemática
    try {
        const resultado = eval(expresionMatematica); // Calculamos el resultado
        document.getElementById('resultado').textContent = resultado; // Mostramos el resultado en la pantalla
        
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
            icon: 'success', // Ícono de éxito
            title: 'Éxito', // Título del mensaje
            text: 'La expresion matemática ha sido generada con éxito.', // Mensaje mostrado
            confirmButtonText: 'Aceptar' // Botón para aceptar
        });
    } catch (error) {
        mostrarAdvertencia('Error al evaluar la expresión.'); // Si hay un error, mostramos una advertencia
    }
};

// Función para validar la expresión polaca
const validarExpresionPolaca = (expresion) => {
    if (expresion.trim() === '') { // Verificamos si la expresión está vacía
        mostrarAdvertencia('Por favor, ingresa una expresión en notación polaca.'); // Advertimos al usuario
        return false; // Retornamos falso porque está vacía
    }

    // Validar que solo contenga números, operadores y espacios
    const expresionValida = /^[+\-*/0-9\s]+$/; // Expresión regular para validar
    if (!expresionValida.test(expresion)) {
        mostrarAdvertencia('La expresión contiene caracteres no válidos o letras. Usa solo números y operadores (+, -, *, /).'); // Advertimos si hay caracteres no válidos
        return false; // Retornamos falso porque hay caracteres no válidos
    }

    return true; // Retornamos verdadero si la expresión es válida
};

// Función para limpiar la expresión
const limpiarExpresionMatematica = () => {
    document.getElementById('expresion').value = ''; // Limpiamos el campo donde se escribe la expresión
    document.getElementById('expresionMatematica').textContent = ''; // Limpiamos el texto de la expresión
    document.getElementById('resultado').textContent = ''; // Limpiamos el texto del resultado
    
    // Mostrar un mensaje informativo al limpiar
    Swal.fire({
        icon: 'info', // Ícono informativo
        title: 'Limpiar', // Título del mensaje
        text: 'La expresión ha sido limpiada.', // Mensaje mostrado
        confirmButtonText: 'Aceptar' // Botón para aceptar
    });
};

// Asignar funciones a los botones
document.getElementById('generarBtn').addEventListener('click', generarExpresionMatematica); // Cuando se hace clic en este botón, genera la expresión matemática
document.getElementById('limpiarBtn').addEventListener('click', limpiarExpresionMatematica); // Cuando se hace clic en este botón, limpia la expresión
