import * as readline from 'readline';

class Arreglo {
    // Dimensiones del hotel
    private numPaises: number = 2;
    private numEstadosPorPais: number = 3;
    private numCiudadesPorEstado: number = 5;
    private numTorresPorCiudad: number = 3;
    private numPisosPorTorre: number = 12;
    private numHabitacionesPorPiso: number = 20;

    // Arreglo para el estado de las habitaciones (números)
    private hotel: number[][][][][][];

    // Arreglo para los datos de las personas (strings)
    private persona: string[][][][][][];

    // Interfaz de readline para entrada/salida
    private rl: readline.Interface;

    constructor() {
        this.hotel = [];
        this.persona = [];
        this.inicializarArreglos();

        // Configurar readline
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    // Método para inicializar/borrar los arreglos
    public inicializarArreglos(): void {
        this.hotel = Array.from({ length: this.numPaises }, () =>
            Array.from({ length: this.numEstadosPorPais }, () =>
                Array.from({ length: this.numCiudadesPorEstado }, () =>
                    Array.from({ length: this.numTorresPorCiudad }, () =>
                        Array.from({ length: this.numPisosPorTorre }, () =>
                            Array.from({ length: this.numHabitacionesPorPiso }, () => 0) // 0: Desocupada
                        )
                    )
                )
            )
        );

        this.persona = Array.from({ length: this.numPaises }, () =>
            Array.from({ length: this.numEstadosPorPais }, () =>
                Array.from({ length: this.numCiudadesPorEstado }, () =>
                    Array.from({ length: this.numTorresPorCiudad }, () =>
                        Array.from({ length: this.numPisosPorTorre }, () =>
                            Array.from({ length: this.numHabitacionesPorPiso }, () => "") // Datos vacíos
                        )
                    )
                )
            )
        );
    }

    // Método para mostrar el menú
    public mostrarMenu(): void {
        console.log("\n--- Menú Principal ---");
        console.log("1. Inicializar/Borrar Arreglos");
        console.log("2. Dar de alta una habitación");
        console.log("3. Dar de baja una habitación");
        console.log("4. Buscar una habitación");
        console.log("5. Mostrar ocupación de una ciudad");
        console.log("6. Cambiar de habitación");
        console.log("7. Salir");
    }

    // Método para esperar la entrada del usuario
    public async esperarEntrada(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(prompt, (input) => {
                resolve(input);
            });
        });
    }

    // Método para dar de alta una habitación
    public alta(
        pais: number,
        estado: number,
        ciudad: number,
        torre: number,
        piso: number,
        habitacion: number,
        nombreOcupante: string,
        numHuespedes: number,
        numDias: number
    ): void {
        if (this.hotel[pais][estado][ciudad][torre][piso][habitacion] === 1) {
            console.log("La habitación ya está ocupada. No se puede realizar la operación.");
        } else {
            this.hotel[pais][estado][ciudad][torre][piso][habitacion] = 1; // Ocupada
            this.persona[pais][estado][ciudad][torre][piso][habitacion] = `${nombreOcupante}|${numHuespedes}|${numDias}`;
            console.log("Habitación ocupada exitosamente.");
        }
    }

    // Método para dar de baja una habitación
    public baja(
        pais: number,
        estado: number,
        ciudad: number,
        torre: number,
        piso: number,
        habitacion: number
    ): void {
        if (this.hotel[pais][estado][ciudad][torre][piso][habitacion] === 0) {
            console.log("La habitación ya está desocupada. No se puede realizar la operación.");
        } else {
            this.hotel[pais][estado][ciudad][torre][piso][habitacion] = 0; // Desocupada
            this.persona[pais][estado][ciudad][torre][piso][habitacion] = ""; // Limpiar datos
            console.log("Habitación desocupada exitosamente.");
        }
    }

    // Método para buscar una habitación
    public buscar(
        pais: number,
        estado: number,
        ciudad: number,
        torre: number,
        piso: number,
        habitacion: number
    ): void {
        if (this.hotel[pais][estado][ciudad][torre][piso][habitacion] === 0) {
            console.log("La habitación está desocupada.");
        } else {
            const datosHabitacion = this.persona[pais][estado][ciudad][torre][piso][habitacion].split("|");
            console.log("Datos de la habitación:");
            console.log("Nombre del ocupante:", datosHabitacion[0]);
            console.log("Número de huéspedes:", datosHabitacion[1]);
            console.log("Número de días:", datosHabitacion[2]);
        }
    }

    // Método para mostrar la ocupación de las torres en una ciudad
    public mostrar(pais: number, estado: number, ciudad: number): void {
        console.log(`Ocupación de las torres en País ${pais}, Estado ${estado}, Ciudad ${ciudad}:`);
        for (let torre = 0; torre < this.numTorresPorCiudad; torre++) {
            console.log(`Torre ${torre}:`);
            for (let piso = 0; piso < this.numPisosPorTorre; piso++) {
                for (let habitacion = 0; habitacion < this.numHabitacionesPorPiso; habitacion++) {
                    const estadoHabitacion = this.hotel[pais][estado][ciudad][torre][piso][habitacion];
                    console.log(
                        `Piso ${piso}, Habitación ${habitacion}: ${estadoHabitacion === 1 ? "Ocupada" : "Desocupada"}`
                    );
                }
            }
        }
    }

    // Método para cambiar una habitación ocupada a otra desocupada
    public cambio(
        paisInicial: number,
        estadoInicial: number,
        ciudadInicial: number,
        torreInicial: number,
        pisoInicial: number,
        habitacionInicial: number,
        paisDestino: number,
        estadoDestino: number,
        ciudadDestino: number,
        torreDestino: number,
        pisoDestino: number,
        habitacionDestino: number
    ): void {
        const estadoInicialHabitacion = this.hotel[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial];
        const estadoDestinoHabitacion = this.hotel[paisDestino][estadoDestino][ciudadDestino][torreDestino][pisoDestino][habitacionDestino];

        if (estadoInicialHabitacion === 0) {
            console.log("La habitación inicial está desocupada. No se puede realizar el cambio.");
        } else if (estadoDestinoHabitacion === 1) {
            console.log("La habitación destino está ocupada. No se puede realizar el cambio.");
        } else {
            // Mover datos de la habitación inicial a la destino
            this.hotel[paisDestino][estadoDestino][ciudadDestino][torreDestino][pisoDestino][habitacionDestino] = 1; // Ocupada
            this.persona[paisDestino][estadoDestino][ciudadDestino][torreDestino][pisoDestino][habitacionDestino] =
                this.persona[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial];

            // Limpiar datos de la habitación inicial
            this.hotel[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial] = 0; // Desocupada
            this.persona[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial] = ""; // Limpiar datos

            console.log("Cambio de habitación realizado exitosamente.");
        }
    }

    // Método auxiliar para obtener parámetros de una habitación
    private async obtenerParametrosHabitacion(accion: string): Promise<number[] | null> {
        console.log(`\n--- ${accion} ---`);
        const pais = await this.esperarEntrada("País (0-1): ");
        const estado = await this.esperarEntrada("Estado (0-2): ");
        const ciudad = await this.esperarEntrada("Ciudad (0-4): ");
        const torre = await this.esperarEntrada("Torre (0-2): ");
        const piso = await this.esperarEntrada("Piso (0-11): ");
        const habitacion = await this.esperarEntrada("Habitación (0-19): ");

        if (
            isNaN(parseInt(pais)) || isNaN(parseInt(estado)) || isNaN(parseInt(ciudad)) ||
            isNaN(parseInt(torre)) || isNaN(parseInt(piso)) || isNaN(parseInt(habitacion))
        ) {
            console.log("Entrada no válida. Intente de nuevo.");
            return null;
        }

        return [parseInt(pais), parseInt(estado), parseInt(ciudad), parseInt(torre), parseInt(piso), parseInt(habitacion)];
    }

    // Método auxiliar para obtener parámetros de una ciudad
    private async obtenerParametrosCiudad(): Promise<number[] | null> {
        console.log("\n--- Mostrar ocupación de una ciudad ---");
        const pais = await this.esperarEntrada("País (0-1): ");
        const estado = await this.esperarEntrada("Estado (0-2): ");
        const ciudad = await this.esperarEntrada("Ciudad (0-4): ");

        if (isNaN(parseInt(pais)) || isNaN(parseInt(estado)) || isNaN(parseInt(ciudad))) {
            console.log("Entrada no válida. Intente de nuevo.");
            return null;
        }

        return [parseInt(pais), parseInt(estado), parseInt(ciudad)];
    }

    // Método para iniciar la aplicación
    public async iniciar(): Promise<void> {
        let opcion: string;

        do {
            this.mostrarMenu();
            opcion = await this.esperarEntrada("Seleccione una opción: ");

            switch (opcion) {
                case "1": // Inicializar/Borrar Arreglos
                    this.inicializarArreglos();
                    console.log("Arreglos inicializados/borrados correctamente.");
                    break;

                case "2": // Dar de alta una habitación
                    const altaParams = await this.obtenerParametrosHabitacion("alta");
                    if (altaParams) {
                        const [pais, estado, ciudad, torre, piso, habitacion] = altaParams;
                        const nombre = await this.esperarEntrada("Nombre del ocupante: ");
                        const huespedes = await this.esperarEntrada("Número de huéspedes: ");
                        const dias = await this.esperarEntrada("Número de días: ");
                        this.alta(pais, estado, ciudad, torre, piso, habitacion, nombre, parseInt(huespedes), parseInt(dias));
                    }
                    break;

                case "3": // Dar de baja una habitación
                    const bajaParams = await this.obtenerParametrosHabitacion("baja");
                    if (bajaParams) {
                        const [pais, estado, ciudad, torre, piso, habitacion] = bajaParams;
                        this.baja(pais, estado, ciudad, torre, piso, habitacion);
                    }
                    break;

                case "4": // Buscar una habitación
                    const buscarParams = await this.obtenerParametrosHabitacion("buscar");
                    if (buscarParams) {
                        const [pais, estado, ciudad, torre, piso, habitacion] = buscarParams;
                        this.buscar(pais, estado, ciudad, torre, piso, habitacion);
                    }
                    break;

                case "5": // Mostrar ocupación de una ciudad
                    const mostrarParams = await this.obtenerParametrosCiudad();
                    if (mostrarParams) {
                        const [pais, estado, ciudad] = mostrarParams;
                        this.mostrar(pais, estado, ciudad);
                    }
                    break;

                case "6": // Cambiar de habitación
                    const cambioParamsInicial = await this.obtenerParametrosHabitacion("cambio (inicial)");
                    const cambioParamsDestino = await this.obtenerParametrosHabitacion("cambio (destino)");
                    if (cambioParamsInicial && cambioParamsDestino) {
                        const [paisIni, estadoIni, ciudadIni, torreIni, pisoIni, habitacionIni] = cambioParamsInicial;
                        const [paisDes, estadoDes, ciudadDes, torreDes, pisoDes, habitacionDes] = cambioParamsDestino;
                        this.cambio(paisIni, estadoIni, ciudadIni, torreIni, pisoIni, habitacionIni, paisDes, estadoDes, ciudadDes, torreDes, pisoDes, habitacionDes);
                    }
                    break;

                case "7": // Salir
                    console.log("Saliendo del programa...");
                    break;

                default:
                    console.log("Opción no válida. Intente de nuevo.");
                    break;
            }
        } while (opcion !== "7");

        this.rl.close(); // Cerrar readline al salir
    }
}

export default Arreglo;