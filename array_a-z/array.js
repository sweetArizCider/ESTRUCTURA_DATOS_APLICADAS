import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class myArrayClass{

    ourASCII = {
        A: 1, Á: 2, a: 3, á: 4, B: 5, b: 6, C: 7, c: 8, D: 9, d: 10, E: 11, É: 12, e: 13, é: 14,
        F: 15, f: 16, G: 17, g: 18, H: 19, h: 20, I: 21, Í: 22, i: 23, í: 24, J: 25, j: 26, 
        K: 27, k: 28, L: 29, l: 30, M: 31, m: 32, N: 33, n: 34, Ñ: 35, ñ: 36, O: 37, Ó: 38, o: 39, ó: 40,
        P: 41, p: 42, Q: 43, q: 44, R: 45, r: 46, S: 47, s: 48, T: 49, t: 50, U: 51, Ú: 52, u: 53, ú: 54, 
        Ü: 55, ü: 56, V: 57, v: 58, W: 59, w: 60, X: 61, x: 62, Y: 63, y: 64, Z: 65, z: 66
    };

    closeTerminal(){
        rl.close();
    }

    waitForInput(question){
        return new Promise(resolve => rl.question(question, resolve))
    };

    showArray(array, pointer){
        return array.slice(0, pointer + 1).join(",")
    }

    searchLetter(array,pointer,letter){
        const activeElements = array.slice(0, pointer + 1);

        const letterIndex = activeElements.map((element, index)=>({element, position: index + 1
        }))
        .filter(({element}) => element.toLowerCase() === letter.toLowerCase())
        .map(({position}) => position)

        if(letterIndex.length !== 0){
            console.log("--- LETRA ENCONTRADA EN LA POSICION : " + letterIndex.join(", ") + " ---" )
        }else{
            console.log("--- LETRA NO ENCONTRADA ---")
        }
    }

    addLetter(array, pointer, letter) {
        const getOurASCIIValue = (char) => this.ourASCII[char] || 0;
        
        if (getOurASCIIValue(letter) === 0) {
            console.log("--- CARACTER INVALIDO: NO HA SIDO AGREGADO AL ARREGLO ---");
            return pointer; 
        }
    
        const activeElements = array.slice(0, pointer + 1);
    
        const insertionPosition = activeElements.findIndex((currentLetter) => {
            const letterValue = getOurASCIIValue(letter);
            const currentLetterValue = getOurASCIIValue(currentLetter);
            
            return (
                letterValue < currentLetterValue ||
                (letterValue === currentLetterValue && letter < currentLetter)
            );
        });

        
        if (insertionPosition === -1) {
            array[++pointer] = letter;
        } else {
            for (let i = pointer + 1; i > insertionPosition; i--) {
                array[i] = array[i - 1];
            }
            array[insertionPosition] = letter;
            pointer++;
        }
        console.log("--- LETRA AGREGADA CORRECTAMENTE ---")
        return pointer;
    }

    deleteLetter(array, pointer, letter) {
        const activeElements = array.slice(0, pointer + 1);
    
        const letterIndices = activeElements
            .map((element, index) => ({ element, position: index }))
            .filter(({ element }) => element.toLowerCase() === letter.toLowerCase())
            .map(({ position }) => position);
    
        if (letterIndices.length === 0) {
            console.log("--- LETRA NO ENCONTRADA ---");
            return pointer; 
        }
    
        for (let i = 0; i < letterIndices.length; i++) {
            const indexToDelete = letterIndices[i];
    
            for (let j = indexToDelete; j < pointer; j++) {
                array[j] = array[j + 1];
            }
    
            array[pointer] = null; 
            pointer--; 
        }
        console.log("--- LETRA ELIMINADA CORRECTAMENTE ---")
        return pointer;
    }
    
            
    
    displayMenu(){
        console.log("\n--- MENÚ PRINCIPAL ---");
        console.log("1. Inicializar / Borrar arreglo");
        console.log("2. Mostrar arreglo");
        console.log("3. Buscar");
        console.log("4. Insertar");
        console.log("5. Eliminar");
        console.log("6. Creditos");
        console.log("7. Salir");
    }
}

export default myArrayClass