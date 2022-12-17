let url = 'https://restcountries.com/v2/all?fields=name';

fetch(url)
    .then( (resposta) => resposta.json() )
    .then( (dados) => {
        console.log( dados );

        let html = "";
        for (let i = 0; i < dados.length; i++) {
            html += `
                <option value="${dados[i].name}">${dados[i].name}</option>
            `;
        }
       
        document.querySelector("#paises").innerHTML += html;
    })
.catch( (erro) => console.log(erro) );

let selecionado = document.querySelector("#paises");
let resultado = document.querySelector(".resultado");

function mostrarInformacoes(){
    if(selecionado.value != "null"){
        resultado.style.visibility = "visible";

        url = `https://restcountries.com/v2/name/${selecionado.value}`;

        fetch(url)
            .then( (resposta) => resposta.json() )
            .then( (dados) => {
                console.log( dados );

                //Bandeira
                html = `
                    <img src="${dados[0].flag}" width="100%"><br>
                `;
                document.querySelector(".fotoBandeira").innerHTML = html; 

                //Nome
                html = `
                    Nome: ${dados[0].name}
                `;
                document.querySelector(".nome").innerHTML = html;

                //Capital
                if(dados[0].capital != null){
                    html = `
                        <img src="images/capital.png" width="35"> Capital: ${dados[0].capital}
                    `;
                    document.querySelector(".capital").innerHTML = html;
                }else{
                    html = `
                        <img src="images/capital.png" width="35"> Capital: Não possui capital
                    `;
                    document.querySelector(".capital").innerHTML = html;
                }

                //Continente
                html = `
                    <img src="images/continents.png" width="35"> Continente: ${dados[0].region}
                `;
                document.querySelector(".continente").innerHTML = html;

                //População
                html = `
                    <img src="images/population.png" width="35"> População: ${dados[0].population} habitantes
                `;
                document.querySelector(".populacao").innerHTML = html;

                //Área
                html = `
                    <img src="images/area.png" width="35"> Área: ${dados[0].area} km²
                `;
                document.querySelector(".area").innerHTML = html;

                //Moedas
                if(dados[0].currencies != null){
                    html = `<img src="images/coin.png" width="35"> Moedas: `;
                    for(i = 0; i < dados[0].currencies.length; i++){
                        html += `
                            ${dados[0].currencies[i].name},
                        `;
                    }
                    html = html.replace(/,\s*$/, "");
                    document.querySelector(".moedas").innerHTML = html;
                }else{
                    html = `<img src="images/coin.png" width="35"> Moedas: Não possui moedas`;
                    document.querySelector(".moedas").innerHTML = html;
                }

                //Idiomas
                html = `<img src="images/language.png" width="35"> Idiomas: `;
                for(i = 0; i < dados[0].languages.length; i++){
                    html += `
                        ${dados[0].languages[i].name}, 
                    `;
                }
                
                html = html.replace(/,\s*$/, "");
                document.querySelector(".idiomas").innerHTML = html;

            })
        .catch( (erro) => console.log(erro) );
        
    }else{
        resultado.style.visibility = "hidden";
    }
    
}