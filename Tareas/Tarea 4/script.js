function calcular(){

    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);

    let resultado = "";

    for(let i = 1; i <= 5; i++){

        switch(i){

            case 1:
                resultado += "<p><b>Primera iteración (SUMA):</b> "
                + (num1 + num2) + "</p>";
            break;

            case 2:
                resultado += "<p><b>Segunda iteración (RESTA):</b> "
                + (num1 - num2) + "</p>";
            break;

            case 3:
                resultado += "<p><b>Tercera iteración (MULTIPLICACIÓN):</b> "
                + (num1 * num2) + "</p>";
            break;

            case 4:

                if(num2 != 0){

                    resultado += "<p><b>Cuarta iteración (DIVISIÓN):</b> "
                    + (num1 / num2) + "</p>";

                }else{

                    resultado += "<p><b>Cuarta iteración (DIVISIÓN):</b> No se puede dividir para 0</p>";
                }

            break;

            case 5:
                resultado += "<p><b>Quinta iteración (MOD %):</b> "
                + (num1 % num2) + "</p>";
            break;
        }
    }

    document.getElementById("resultado").innerHTML = resultado;
}
