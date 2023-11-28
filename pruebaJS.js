const RESULTADO1 = document.getElementById("resultado1");
const RESULTADO2 = document.getElementById("resultado2");
const RESULTADO3 = document.getElementById("resultado3");
const BUTTON = document.getElementById("calcular");
const INPUT = document.getElementById("peso");
const ERROR = document.getElementById("error");
const METODO_HOLLIDAY = document.getElementById("holliday")
const METODO_SUPERFICIE = document.getElementById("superficie")

BUTTON.addEventListener("click", () => {
  let peso = parseFloat(INPUT.value);

  if (isNaN(peso) || peso <= 0) {
    ERROR.style.display = "block";
    RESULTADO1.style.display = "none";
    RESULTADO2.style.display = "none";
  } else if (peso > 30) {
    let sc = SuperficieCorporal(peso);
    RESULTADO1.innerHTML = "Volumen por hora (1500): " + sc[0] + " cc/h";
    RESULTADO1.style.display = "block";
    RESULTADO2.innerHTML = "Volumen por hora (2000): " + sc[1] + " cc/h";
    RESULTADO2.style.display = "block";
    RESULTADO3.innerHTML = sc[2];
    RESULTADO3.style.display = "none";
    METODO_SUPERFICIE.style.display = "block"
    METODO_HOLLIDAY.style.display = "none"
    ERROR.style.display = "none";
  } else {
    let hollidaySegar = HollidaySegar(peso);
    RESULTADO1.innerHTML = "Docificación diaria: " + hollidaySegar [0] + " cc";
    RESULTADO1.style.display = "block";
    RESULTADO2.innerHTML = "Docificación por hora (m): " + hollidaySegar [1] + " cc/h";
    RESULTADO2.style.display = "block";
    RESULTADO3.innerHTML = "m+m/2: " + hollidaySegar [2] + " cc/h";
    RESULTADO3.style.display = "block";
    METODO_HOLLIDAY.style.display = "block"
    METODO_SUPERFICIE.style.display = "none"
    ERROR.style.display = "none";
  }
});

function SuperficieCorporal(peso) {
  let superficieCorporal = ((peso * 4) + 7) / (peso + 90);
  return [(superficieCorporal*1500/24).toFixed(2), (superficieCorporal*2000/24).toFixed(2)];
}

function HollidaySegar(peso) {
  let resultado = 0;
  let resultados = [];
  if (peso <= 10) {
    resultado = peso*100;
  } else if (peso <20) {
    peso -= 10
    resultado = 1000 + peso*50 ;
  } else {
    peso -= 20
    resultado = 1500 + peso*20;
  }
  
  resultados.push((resultado).toFixed(0))
  resultados.push((resultado / 24).toFixed(2))
  resultados.push((resultado / 24 * 1.5).toFixed(2))
  return resultados
}
