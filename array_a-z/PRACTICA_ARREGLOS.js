import myArrayClass from "./array.js";
const myArray = new myArrayClass();


const maxSize = 30;
let array = new Array(maxSize).fill(null);
let pointer = null;
let loop = true;
let option
let answer

async function main(){
    while(loop){
        myArray.displayMenu();
        option = await myArray.waitForInput("Ingresa una opcion: ");
        switch(option){
            case '1':
                pointer = -1;
                console.log('\n --- ARREGLO INICIALIZADO ---');
                break
            case '2':
                if(pointer !== -1 && pointer !== null){
                    console.log(myArray.showArray(array, pointer));}
                else{console.log("\n --- ARREGLO VACIO ---")}
                break
            case '3':
                if(pointer !== -1 && pointer !== null){
                    answer = await myArray.waitForInput("Ingresa la letra a buscar: ");
                    myArray.searchLetter(array, pointer, answer);
                }
                else{console.log("\n --- ARREGLO VACIO ---")}

                break
            case '4':
                if (pointer !== null && pointer < maxSize - 1){
                    answer = await myArray.waitForInput("Ingresa una letra: ");
                    pointer = myArray.addLetter(array, pointer, answer);
                    
                }else{
                    console.log('--- ARREGLO LLENO O NO INIZIALIZADO ---')
                }
                break
            case '5':
                if (pointer !== null && pointer < maxSize - 1){
                    answer = await myArray.waitForInput("Ingresa una letra: ");
                    pointer = myArray.deleteLetter(array, pointer, answer);
                }
                break
            case '6':
                console.log("\n--- CREDITOS ---");
                console.log("MATERIA: ESTRUCTURA DE DATOS APLICADA");
                console.log("INTEGRANTES:");
                console.log("PAMELA ROBLEDO PINTO []");
                console.log("CARLOS ARIZPE HERNANDEZ [23170205]");
                break
            case '7':
                console.log("--- PROCESO FINALIZADO ---")
                loop = false;
                myArray.closeTerminal();
                break
            default:
                console.log("--- INGRESE UNA OPCION DISPONIBLE [1,2,3,4,5,6 o 7] ---")
                break
        }
        
    }
}

main();

