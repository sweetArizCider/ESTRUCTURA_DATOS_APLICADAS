import Arreglo from './arreglo';

// Función principal
async function main() {
    const sistemaHotel = new Arreglo();
    await sistemaHotel.iniciar();
}

// Ejecutar el programa
main();