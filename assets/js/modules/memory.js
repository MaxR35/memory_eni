export const memoryBuilder = (container, X, Y) => {
    let deck = [];
    let pairs = 0;
    // Construction de la grille
    for (let i = 0; i < X; i++) {

        // Ligne
        let row = document.createElement('DIV');
        row.classList.add('flex', 'w-full', 'gap-3', 'mb-3');
        // Colonne
        for (let j = 0; j < Y; j++) {
            if (j % 2 == 0) {
                pairs++;
            }
            deck.push(pairs); // Consctruction deck de carte

            // Construction Carte
            let col = document.createElement('DIV'); 
            col.classList.add('flip-card', 'aos-init' ,'w-full');
            col.setAttribute('data-aos', 'fade-up');
            
            // Element CSS effet Flip
            let innerCard = document.createElement('DIV');
            innerCard.classList.add('flip-card-inner', 'rounded-xl');

            let frontCard = document.createElement('DIV');
            frontCard.classList.add('flip-card-front', 'rounded-xl');

            let backCard = document.createElement('DIV');
            backCard.classList.add('flip-card-back', 'rounded-xl');

            // Append element carte dans ROW
            innerCard.appendChild(frontCard);
            innerCard.appendChild(backCard);
            col.appendChild(innerCard);
            row.appendChild(col);
        }
        // Append ligne dans CONTAINER
        container.appendChild(row);
    };
    return deck;
};
export const startMemory = (delay, col, card) => {
    delay = delay + 50;
    // Animation
    col.setAttribute('data-aos-delay', delay);
    col.classList.add('aos-animate');

    // Attribution
    col.setAttribute('data-card',  card);
    col.querySelector('.flip-card-back').innerText =  card;
    col.querySelector('.flip-card-front').innerText =  card;
    return delay;
};
export const colStorageCheck = (colStorage, col) => {
     
    if (colStorage) { // Si carte déjà select 
        if (colStorage.getAttribute('data-card') == col.getAttribute('data-card')) {
            // Pair true
            col.classList.add('paired');
            colStorage.classList.add('paired');
            return  '';
        } else {
            // Pair false
            col.classList.remove('animated');
            colStorage.classList.remove('animated');
            return  '';
        }
    } else { // Si aucune carte encore select
        return  col;
    };
};
export const aosOut = ($container) => {
    let delay = 0;
     // Animation de victore
    $container.querySelectorAll('[data-aos]').forEach(aosElement => {
        delay = delay + 50;
        setTimeout(() => {
            aosElement.dataset.aosDelay = delay;
            aosElement.classList.remove('aos-animate'); // Dispartition de memory
        }, delay);
    });
};
export const aosIn = ($container) => {
    let delay = 0;
     // Animation de victore
    $container.querySelectorAll('[data-aos]').forEach(aosElement => {
        delay = delay + 50;
        setTimeout(() => {
            aosElement.dataset.aosDelay = delay;
            aosElement.classList.add('aos-animate'); // Dispartition de memory
        }, delay);
    });
};