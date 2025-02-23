"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Arreglo = /** @class */ (function () {
    function Arreglo() {
        this.numPaises = 2;
        this.numEstadosPorPais = 3;
        this.numCiudadesPorEstado = 5;
        this.numTorresPorCiudad = 3;
        this.numPisosPorTorre = 12;
        this.numHabitacionesPorPiso = 20;
        this.arregloInicializado = false;
        this.hotel = [];
        this.persona = [];
        this.inicializarArreglos();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    Arreglo.prototype.inicializarArreglos = function () {
        var _this = this;
        this.hotel = Array.from({ length: this.numPaises }, function () {
            return Array.from({ length: _this.numEstadosPorPais }, function () {
                return Array.from({ length: _this.numCiudadesPorEstado }, function () {
                    return Array.from({ length: _this.numTorresPorCiudad }, function () {
                        return Array.from({ length: _this.numPisosPorTorre }, function () {
                            return Array.from({ length: _this.numHabitacionesPorPiso }, function () { return 0; });
                        });
                    });
                });
            });
        });
        this.persona = Array.from({ length: this.numPaises }, function () {
            return Array.from({ length: _this.numEstadosPorPais }, function () {
                return Array.from({ length: _this.numCiudadesPorEstado }, function () {
                    return Array.from({ length: _this.numTorresPorCiudad }, function () {
                        return Array.from({ length: _this.numPisosPorTorre }, function () {
                            return Array.from({ length: _this.numHabitacionesPorPiso }, function () { return ""; });
                        });
                    });
                });
            });
        });
    };
    Arreglo.prototype.mostrarMenu = function () {
        console.log("\n--- Menú Principal ---");
        console.log("1. Inicializar/Borrar Arreglos");
        console.log("2. Dar de alta una habitación");
        console.log("3. Dar de baja una habitación");
        console.log("4. Buscar una habitación");
        console.log("5. Mostrar ocupación de una ciudad");
        console.log("6. Cambiar de habitación");
        console.log("7. Salir");
        console.log("8. Creditos");
    };
    Arreglo.prototype.esperarEntrada = function (prompt) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.rl.question(prompt, function (input) {
                            resolve(input);
                        });
                    })];
            });
        });
    };
    Arreglo.prototype.validarEntrada = function (valor, min, max) {
        var num = parseInt(valor);
        if (isNaN(num) || num < min || num > max) {
            return null;
        }
        return num;
    };
    Arreglo.prototype.alta = function (pais, estado, ciudad, torre, piso, habitacion, nombreOcupante, numHuespedes, numDias) {
        if (this.hotel[pais][estado][ciudad][torre][piso][habitacion] === 1) {
            console.log("La habitación ya está ocupada. No se puede realizar la operación.");
        }
        else {
            this.hotel[pais][estado][ciudad][torre][piso][habitacion] = 1; // Ocupada
            this.persona[pais][estado][ciudad][torre][piso][habitacion] = "".concat(nombreOcupante, "|").concat(numHuespedes, "|").concat(numDias);
            console.log("Habitación ocupada exitosamente.");
        }
    };
    // Método para dar de baja una habitación
    Arreglo.prototype.baja = function (pais, estado, ciudad, torre, piso, habitacion) {
        if (this.hotel[pais][estado][ciudad][torre][piso][habitacion] === 0) {
            console.log("La habitación ya está desocupada. No se puede realizar la operación.");
        }
        else {
            this.hotel[pais][estado][ciudad][torre][piso][habitacion] = 0; // Desocupada
            this.persona[pais][estado][ciudad][torre][piso][habitacion] = ""; // Limpiar datos
            console.log("Habitación desocupada exitosamente.");
        }
    };
    // Método para buscar una habitación
    Arreglo.prototype.buscar = function (pais, estado, ciudad, torre, piso, habitacion) {
        if (this.hotel[pais][estado][ciudad][torre][piso][habitacion] === 0) {
            console.log("La habitación está desocupada.");
        }
        else {
            var datosHabitacion = this.persona[pais][estado][ciudad][torre][piso][habitacion].split("|");
            console.log("Datos de la habitación:");
            console.log("Nombre del ocupante:", datosHabitacion[0]);
            console.log("Número de huéspedes:", datosHabitacion[1]);
            console.log("Número de días:", datosHabitacion[2]);
        }
    };
    Arreglo.prototype.mostrar = function (pais, estado, ciudad) {
        console.log("Ocupaci\u00F3n de las torres en Pa\u00EDs ".concat(pais, ", Estado ").concat(estado, ", Ciudad ").concat(ciudad, ":"));
        for (var torre = 0; torre < this.numTorresPorCiudad; torre++) {
            console.log("Torre ".concat(torre, ":"));
            for (var piso = 0; piso < this.numPisosPorTorre; piso++) {
                for (var habitacion = 0; habitacion < this.numHabitacionesPorPiso; habitacion++) {
                    var estadoHabitacion = this.hotel[pais][estado][ciudad][torre][piso][habitacion];
                    console.log("Piso ".concat(piso, ", Habitaci\u00F3n ").concat(habitacion, ": ").concat(estadoHabitacion === 1 ? "Ocupada" : "Desocupada"));
                }
            }
        }
    };
    Arreglo.prototype.cambio = function (paisInicial, estadoInicial, ciudadInicial, torreInicial, pisoInicial, habitacionInicial, paisDestino, estadoDestino, ciudadDestino, torreDestino, pisoDestino, habitacionDestino) {
        var estadoInicialHabitacion = this.hotel[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial];
        var estadoDestinoHabitacion = this.hotel[paisDestino][estadoDestino][ciudadDestino][torreDestino][pisoDestino][habitacionDestino];
        if (estadoInicialHabitacion === 0) {
            console.log("La habitación inicial está desocupada. No se puede realizar el cambio.");
        }
        else if (estadoDestinoHabitacion === 1) {
            console.log("La habitación destino está ocupada. No se puede realizar el cambio.");
        }
        else {
            this.hotel[paisDestino][estadoDestino][ciudadDestino][torreDestino][pisoDestino][habitacionDestino] = 1;
            this.persona[paisDestino][estadoDestino][ciudadDestino][torreDestino][pisoDestino][habitacionDestino] =
                this.persona[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial];
            this.hotel[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial] = 0;
            this.persona[paisInicial][estadoInicial][ciudadInicial][torreInicial][pisoInicial][habitacionInicial] = "";
            console.log("Cambio de habitación realizado exitosamente.");
        }
    };
    Arreglo.prototype.obtenerParametrosHabitacion = function (accion) {
        return __awaiter(this, void 0, void 0, function () {
            var pais, _a, estado, _b, ciudad, _c, torre, _d, piso, _e, habitacion, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!this.arregloInicializado) {
                            console.log("Primero debe inicializar los arreglos con la opción 1.");
                            return [2 /*return*/, null];
                        }
                        console.log("\n--- ".concat(accion, " ---"));
                        _a = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("País (0-1): ")];
                    case 1:
                        pais = _a.apply(this, [_g.sent(), 0, this.numPaises - 1]);
                        _b = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("Estado (0-2): ")];
                    case 2:
                        estado = _b.apply(this, [_g.sent(), 0, this.numEstadosPorPais - 1]);
                        _c = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("Ciudad (0-4): ")];
                    case 3:
                        ciudad = _c.apply(this, [_g.sent(), 0, this.numCiudadesPorEstado - 1]);
                        _d = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("Torre (0-2): ")];
                    case 4:
                        torre = _d.apply(this, [_g.sent(), 0, this.numTorresPorCiudad - 1]);
                        _e = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("Piso (0-11): ")];
                    case 5:
                        piso = _e.apply(this, [_g.sent(), 0, this.numPisosPorTorre - 1]);
                        _f = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("Habitación (0-19): ")];
                    case 6:
                        habitacion = _f.apply(this, [_g.sent(), 0, this.numHabitacionesPorPiso - 1]);
                        if (pais === null || estado === null || ciudad === null || torre === null || piso === null || habitacion === null) {
                            console.log("Datos inválidos. Intente de nuevo.");
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, [pais, estado, ciudad, torre, piso, habitacion]];
                }
            });
        });
    };
    // Método auxiliar para obtener parámetros de una ciudad
    Arreglo.prototype.obtenerParametrosCiudad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pais, _a, estado, _b, ciudad, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.arregloInicializado) {
                            console.log("Primero debe inicializar los arreglos con la opción 1.");
                            return [2 /*return*/, null];
                        }
                        console.log("\n--- Mostrar ocupación de una ciudad ---");
                        _a = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("País (0-1): ")];
                    case 1:
                        pais = _a.apply(this, [_d.sent(), 0, this.numPaises - 1]);
                        _b = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("Estado (0-2): ")];
                    case 2:
                        estado = _b.apply(this, [_d.sent(), 0, this.numEstadosPorPais - 1]);
                        _c = this.validarEntrada;
                        return [4 /*yield*/, this.esperarEntrada("Ciudad (0-4): ")];
                    case 3:
                        ciudad = _c.apply(this, [_d.sent(), 0, this.numCiudadesPorEstado - 1]);
                        if (pais === null || estado === null || ciudad === null) {
                            console.log("Datos inválidos. Intente de nuevo.");
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, [pais, estado, ciudad]];
                }
            });
        });
    };
    Arreglo.prototype.iniciar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opcion, _a, altaParams, pais, estado, ciudad, torre, piso, habitacion, nombre, huespedes, dias, bajaParams, pais, estado, ciudad, torre, piso, habitacion, buscarParams, pais, estado, ciudad, torre, piso, habitacion, mostrarParams, pais, estado, ciudad, cambioParamsInicial, cambioParamsDestino, paisIni, estadoIni, ciudadIni, torreIni, pisoIni, habitacionIni, paisDes, estadoDes, ciudadDes, torreDes, pisoDes, habitacionDes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.mostrarMenu();
                        return [4 /*yield*/, this.esperarEntrada("Seleccione una opción: ")];
                    case 1:
                        opcion = _b.sent();
                        _a = opcion;
                        switch (_a) {
                            case "1": return [3 /*break*/, 2];
                            case "2": return [3 /*break*/, 3];
                            case "3": return [3 /*break*/, 9];
                            case "4": return [3 /*break*/, 11];
                            case "5": return [3 /*break*/, 13];
                            case "6": return [3 /*break*/, 15];
                            case "7": return [3 /*break*/, 18];
                            case "8": return [3 /*break*/, 19];
                        }
                        return [3 /*break*/, 20];
                    case 2:
                        this.inicializarArreglos();
                        this.arregloInicializado = true;
                        console.log("Arreglos inicializados/borrados correctamente.");
                        return [3 /*break*/, 21];
                    case 3: return [4 /*yield*/, this.obtenerParametrosHabitacion("alta")];
                    case 4:
                        altaParams = _b.sent();
                        if (!altaParams) return [3 /*break*/, 8];
                        pais = altaParams[0], estado = altaParams[1], ciudad = altaParams[2], torre = altaParams[3], piso = altaParams[4], habitacion = altaParams[5];
                        return [4 /*yield*/, this.esperarEntrada("Nombre del ocupante: ")];
                    case 5:
                        nombre = _b.sent();
                        return [4 /*yield*/, this.esperarEntrada("Número de huéspedes: ")];
                    case 6:
                        huespedes = _b.sent();
                        return [4 /*yield*/, this.esperarEntrada("Número de días: ")];
                    case 7:
                        dias = _b.sent();
                        this.alta(pais, estado, ciudad, torre, piso, habitacion, nombre, parseInt(huespedes), parseInt(dias));
                        _b.label = 8;
                    case 8: return [3 /*break*/, 21];
                    case 9: return [4 /*yield*/, this.obtenerParametrosHabitacion("baja")];
                    case 10:
                        bajaParams = _b.sent();
                        if (bajaParams) {
                            pais = bajaParams[0], estado = bajaParams[1], ciudad = bajaParams[2], torre = bajaParams[3], piso = bajaParams[4], habitacion = bajaParams[5];
                            this.baja(pais, estado, ciudad, torre, piso, habitacion);
                        }
                        return [3 /*break*/, 21];
                    case 11: return [4 /*yield*/, this.obtenerParametrosHabitacion("buscar")];
                    case 12:
                        buscarParams = _b.sent();
                        if (buscarParams) {
                            pais = buscarParams[0], estado = buscarParams[1], ciudad = buscarParams[2], torre = buscarParams[3], piso = buscarParams[4], habitacion = buscarParams[5];
                            this.buscar(pais, estado, ciudad, torre, piso, habitacion);
                        }
                        return [3 /*break*/, 21];
                    case 13: return [4 /*yield*/, this.obtenerParametrosCiudad()];
                    case 14:
                        mostrarParams = _b.sent();
                        if (mostrarParams) {
                            pais = mostrarParams[0], estado = mostrarParams[1], ciudad = mostrarParams[2];
                            this.mostrar(pais, estado, ciudad);
                        }
                        return [3 /*break*/, 21];
                    case 15: return [4 /*yield*/, this.obtenerParametrosHabitacion("cambio (inicial)")];
                    case 16:
                        cambioParamsInicial = _b.sent();
                        return [4 /*yield*/, this.obtenerParametrosHabitacion("cambio (destino)")];
                    case 17:
                        cambioParamsDestino = _b.sent();
                        if (cambioParamsInicial && cambioParamsDestino) {
                            paisIni = cambioParamsInicial[0], estadoIni = cambioParamsInicial[1], ciudadIni = cambioParamsInicial[2], torreIni = cambioParamsInicial[3], pisoIni = cambioParamsInicial[4], habitacionIni = cambioParamsInicial[5];
                            paisDes = cambioParamsDestino[0], estadoDes = cambioParamsDestino[1], ciudadDes = cambioParamsDestino[2], torreDes = cambioParamsDestino[3], pisoDes = cambioParamsDestino[4], habitacionDes = cambioParamsDestino[5];
                            this.cambio(paisIni, estadoIni, ciudadIni, torreIni, pisoIni, habitacionIni, paisDes, estadoDes, ciudadDes, torreDes, pisoDes, habitacionDes);
                        }
                        return [3 /*break*/, 21];
                    case 18:
                        console.log("Saliendo del programa...");
                        return [3 /*break*/, 21];
                    case 19:
                        console.log("\n--- CREDITOS ---");
                        console.log("MATERIA: ESTRUCTURA DE DATOS APLICADAS");
                        console.log("INTEGRANTES:");
                        console.log("PAMELA ROBLEDO PINTO [23170048]");
                        console.log("CARLOS ARIZPE HERNANDEZ [23170205]");
                        return [3 /*break*/, 21];
                    case 20:
                        console.log("Opción no válida. Intente de nuevo.");
                        return [3 /*break*/, 21];
                    case 21:
                        if (opcion !== "7") return [3 /*break*/, 0];
                        _b.label = 22;
                    case 22:
                        this.rl.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Arreglo;
}());
exports.default = Arreglo;
