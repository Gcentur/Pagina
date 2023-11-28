// Obteniendo referencias a los elementos del DOM
const RESULTADO1 = document.getElementById("resultado1");
const RESULTADO2 = document.getElementById("resultado2");
const RESULTADO3 = document.getElementById("resultado3");
const BUTTON = document.getElementById("calcular");
const INPUT = document.getElementById("peso");
const ERROR = document.getElementById("error");
const METODO_HOLLIDAY = document.getElementById("holliday");
const METODO_SUPERFICIE = document.getElementById("superficie");

// Función para mostrar el error
const displayError = (display) => {
    ERROR.style.display = display;
    RESULTADO1.style.display = "none";
    RESULTADO2.style.display = "none";
    RESULTADO3.style.display = "none";
};

// Función para mostrar los resultados
const displayResults = (results, method) => {
    RESULTADO1.innerHTML = results[0];
    RESULTADO1.style.display = "block";
    RESULTADO2.innerHTML = results[1];
    RESULTADO2.style.display = "block";
    RESULTADO3.innerHTML = results[2];
    RESULTADO3.style.display = "block";

    METODO_HOLLIDAY.style.display = "none";
    METODO_SUPERFICIE.style.display = "none";

    // Mostrar solo un método a la vez
    method.style.display = "block";

    ERROR.style.display = "none";
};

// Evento click del botón calcular
BUTTON.addEventListener("click", () => {
    event.preventDefault();
    let peso = parseFloat(INPUT.value);

    // Validación del peso
    if (isNaN(peso) || peso <= 0) {
        displayError("block");
    } else {
        // Cálculo de los resultados y visualización
        let results = peso > 30 ? SuperficieCorporal(peso) : HollidaySegar(peso);
        displayResults(results, peso > 30 ? METODO_SUPERFICIE : METODO_HOLLIDAY);
    }
});

// Función para calcular la superficie corporal
function SuperficieCorporal(peso) {
    let superficieCorporal = ((peso * 4) + 7) / (peso + 90);
    return [
        `Volumen por hora (1500): ${Math.ceil(superficieCorporal * 1500 / 24)} cc/h`,
        `Volumen por hora (2000): ${Math.ceil(superficieCorporal * 2000 / 24)} cc/h`,
        ""
    ];
}

// Función para calcular la dosificación según Holliday-Segar
function HollidaySegar(peso) {
    let resultado = peso <= 10 ? peso * 100 : peso < 20 ? 1000 + (peso - 10) * 50 : 1500 + (peso - 20) * 20;

    return [
        `Docificación diaria: ${Math.ceil(resultado)} cc`,
        `Docificación por hora (m): ${Math.ceil(resultado / 24)} cc/h`,
        `m+m/2: ${Math.ceil(resultado / 24 * 1.5)} cc/h`
    ];
}
