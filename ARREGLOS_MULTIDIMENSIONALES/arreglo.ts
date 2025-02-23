import * as readline from 'readline';

class Arreglo {
    private numPaises: number = 2;
    private numEstadosPorPais: number = 3;
    private numCiudadesPorEstado: number = 5;
    private numTorresPorCiudad: number = 3;
    private numPisosPorTorre: number = 12;
    private numHabitacionesPorPiso: number = 20;

    private hotel: number[][][][][][];

    private persona: string[][][][][][];

    private arregloInicializado: boolean = false;

    private rl: readline.Interface;

    constructor() {
        this.hotel = [];
        this.persona = [];
        this.inicializarArreglos();

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    public inicializarArreglos(): void {
        this.hotel = Array.from({ length: this.numPaises }, () =>
            Array.from({ length: this.numEstadosPorPais }, () =>
                Array.from({ length: this.numCiudadesPorEstado }, () =>
                    Array.from({ length: this.numTorresPorCiudad }, () =>
                        Array.from({ length: this.numPisosPorTorre }, () =>
                            Array.from({ length: this.numHabitacionesPorPiso }, () => 0) 
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
                            Array.from({ length: this.numHabitacionesPorPiso }, () => "")
                        )
                    )
                )
            )
        );
        
    }

   
    

    public mostrarMenu(): void {
        console.log("\n--- Menú Principal ---");
        console.log("1. Inicializar/Borrar Arreglos");
        console.log("2. Dar de alta una habitación");
        console.log("3. Dar de baja una habitación");
        console.log("4. Buscar una habitación");
        console.log("5. Mostrar ocupación de una ciudad");
        console.log("6. Cambiar de habitación");
        console.log("7. Salir");
        console.log("8. Creditos");
    }

    public async esperarEntrada(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(prompt, (input) => {
                resolve(input);
            });
        });
    }
    private validarEntrada(valor: string, min: number, max: number): number | null {
        const num = parseInt(valor);
        if (isNaN(num) || num < min || num > max) {
            return null;
        }
        return num;
    }

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
            this.hotel[paisDestino][estadoDestino][ciudadDestino][torreDestino][pisoDestino][habitacionDestino] = 1; 
            this.persona[paisDestino][estadoDestino][ciudadDestino][torreDestino][pisoDestino][habitacionDestino] =
                this.persona[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial];

            this.hotel[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial] = 0; 
            this.persona[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial] = ""; 
            console.log("Cambio de habitación realizado exitosamente.");
        }
    }

    private async obtenerParametrosHabitacion(accion: string): Promise<number[] | null> {
        if (!this.arregloInicializado) {
            console.log("Primero debe inicializar los arreglos con la opción 1.");
            return null;
        }

        console.log(`\n--- ${accion} ---`);

        const pais = this.validarEntrada(await this.esperarEntrada("País (0-1): "), 0, this.numPaises - 1);
        const estado = this.validarEntrada(await this.esperarEntrada("Estado (0-2): "), 0, this.numEstadosPorPais - 1);
        const ciudad = this.validarEntrada(await this.esperarEntrada("Ciudad (0-4): "), 0, this.numCiudadesPorEstado - 1);
        const torre = this.validarEntrada(await this.esperarEntrada("Torre (0-2): "), 0, this.numTorresPorCiudad - 1);
        const piso = this.validarEntrada(await this.esperarEntrada("Piso (0-11): "), 0, this.numPisosPorTorre - 1);
        const habitacion = this.validarEntrada(await this.esperarEntrada("Habitación (0-19): "), 0, this.numHabitacionesPorPiso - 1);

        if (pais === null || estado === null || ciudad === null || torre === null || piso === null || habitacion === null) {
            console.log("Datos inválidos. Intente de nuevo.");
            return null;
        }

        return [pais, estado, ciudad, torre, piso, habitacion];
    }

    // Método auxiliar para obtener parámetros de una ciudad
    private async obtenerParametrosCiudad(): Promise<number[] | null> {
        if (!this.arregloInicializado) {
            console.log("Primero debe inicializar los arreglos con la opción 1.");
            return null;
        }
    
        console.log("\n--- Mostrar ocupación de una ciudad ---");
    
        const pais = this.validarEntrada(await this.esperarEntrada("País (0-1): "), 0, this.numPaises - 1);
        const estado = this.validarEntrada(await this.esperarEntrada("Estado (0-2): "), 0, this.numEstadosPorPais - 1);
        const ciudad = this.validarEntrada(await this.esperarEntrada("Ciudad (0-4): "), 0, this.numCiudadesPorEstado - 1);
    
        if (pais === null || estado === null || ciudad === null) {
            console.log("Datos inválidos. Intente de nuevo.");
            return null;
        }
    
        return [pais, estado, ciudad];
    }

    public async iniciar(): Promise<void> {
        let opcion: string;

        do {
            this.mostrarMenu();
            opcion = await this.esperarEntrada("Seleccione una opción: ");

            switch (opcion) {
                case "1": 
                    this.inicializarArreglos();
                    this.arregloInicializado = true;
                    console.log("Arreglos inicializados/borrados correctamente.");
                    break;

                case "2": 
                    const altaParams = await this.obtenerParametrosHabitacion("alta");
                    if (altaParams) {
                        const [pais, estado, ciudad, torre, piso, habitacion] = altaParams;
                        const nombre = await this.esperarEntrada("Nombre del ocupante: ");
                        const huespedes = await this.esperarEntrada("Número de huéspedes: ");
                        const dias = await this.esperarEntrada("Número de días: ");
                        this.alta(pais, estado, ciudad, torre, piso, habitacion, nombre, parseInt(huespedes), parseInt(dias));
                    }
                    break;

                case "3": 
                    const bajaParams = await this.obtenerParametrosHabitacion("baja");
                    if (bajaParams) {
                        const [pais, estado, ciudad, torre, piso, habitacion] = bajaParams;
                        this.baja(pais, estado, ciudad, torre, piso, habitacion);
                    }
                    break;

                case "4": 
                    const buscarParams = await this.obtenerParametrosHabitacion("buscar");
                    if (buscarParams) {
                        const [pais, estado, ciudad, torre, piso, habitacion] = buscarParams;
                        this.buscar(pais, estado, ciudad, torre, piso, habitacion);
                    }
                    break;

                case "5": 
                    const mostrarParams = await this.obtenerParametrosCiudad();
                    if (mostrarParams) {
                        const [pais, estado, ciudad] = mostrarParams;
                        this.mostrar(pais, estado, ciudad);
                    }
                    break;

                case "6": 
                    const cambioParamsInicial = await this.obtenerParametrosHabitacion("cambio (inicial)");
                    const cambioParamsDestino = await this.obtenerParametrosHabitacion("cambio (destino)");
                    if (cambioParamsInicial && cambioParamsDestino) {
                        const [paisIni, estadoIni, ciudadIni, torreIni, pisoIni, habitacionIni] = cambioParamsInicial;
                        const [paisDes, estadoDes, ciudadDes, torreDes, pisoDes, habitacionDes] = cambioParamsDestino;
                        this.cambio(paisIni, estadoIni, ciudadIni, torreIni, pisoIni, habitacionIni, paisDes, estadoDes, ciudadDes, torreDes, pisoDes, habitacionDes);
                    }
                    break;

                case "7": 
                    console.log("Saliendo del programa...");
                    break;

                case"8":
                console.log("\n--- CREDITOS ---");
                console.log("MATERIA: ESTRUCTURA DE DATOS APLICADAS");
                console.log("INTEGRANTES:");
                console.log("PAMELA ROBLEDO PINTO [23170048]");
                console.log("CARLOS ARIZPE HERNANDEZ [23170205]");
                    break;

                default:
                    console.log("Opción no válida. Intente de nuevo.");
                    break;
            }
        } while (opcion !== "7");

        this.rl.close(); 
    }
}

export default Arreglo;