const imgSemaphore = document.getElementById( 'img' );
const buttons = document.getElementById( 'buttons' );
let colorIndex = 0;
let intervalId = null;

//um objeto que contém várias funções, cada uma responsável por trocar as cores do semaforo assim que clicar no botão das respectivas cores
const turnOn = {
    'red':      () => imgSemaphore.src = './src/imagens/vermelho.png',
    'yellow':   () => imgSemaphore.src = './src/imagens/amarelo.png',
    'green':    () => imgSemaphore.src = './src/imagens/verde.png',
    'automatic': () => intervalId = setInterval( changeColor, 1000 )
};

//função chamada quando um dos botões dentro do elemento com o ID "buttons" é clicado. Ela para a mudança automática de cores. Corresponde a uma das chaves do objeto turnOn
const trafficLight = ( event ) => {
    stopAutomatic();
    turnOn[event.target.id]();
    //elemento HTML em que o evento ocorreu. O .id é a propriedade que retorna o ID do elemento HTML em que o evento ocorreu. 

};

/*função responsável por atualizar o índice da cor para a próxima cor na ordem do array de cores.
Sua finalidade principal é controlar a transição suave entre as cores do semáforo, garantindo que, após exibir uma cor por um período de tempo específico, o semáforo passe para a próxima cor na sequência correta. */
const nextIndex = () => {

    if (colorIndex < 2){
        colorIndex++
    } else{
        colorIndex = 0
    }
};

//função responsável por mudar a cor do semáforo, obtém a cor atual baseada no índice de cores, atualiza a imagem do semáforo com a cor correspondente e então avança para a próxima cor.
const changeColor = () => {
    const colors = ['red','yellow','green']
    const color = colors[ colorIndex ];

    turnOn[color]();
    nextIndex();
};

// função que paralisa a mudança automática de cores do semáforo. Ela limpa o intervalo de tempo definido pelo setInterval.
const stopAutomatic = () => {
    clearInterval ( intervalId );
};


// adiciona um ouvinte de evento de clique aos botões dentro do elemento com o ID "buttons"
buttons.addEventListener('click', trafficLight );