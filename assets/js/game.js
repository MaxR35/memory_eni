// Dépendances :
import * as memory from "./modules/memory.js";

document.addEventListener('DOMContentLoaded', () => { // Script si DOM totalement chargé

    const $MEMORY_CONTAINER = document.getElementById('memoryContainer');
    const $USER_SCORE = document.getElementById('userScore');

    window.addEventListener('load', () => {
        // Fonction construction memory + récupération tableau de carte mélanger
        let deck = memory.memoryBuilder($MEMORY_CONTAINER, 4, 4).sort(() => Math.random() - 0.5); // Si positif A apres B, Si négatif A avant B
       
        // Récupération de toute les cartes présente après construction de la grille
        const $COLS = document.querySelectorAll('.flip-card');

        // Initialisation des variables de la partie :
        let score = 0;
        let colStorage;
        let win = false;

        // Delay pour animation
        let delay = 350;
        
        $COLS.forEach((col, i) => {
            // Selection de la carte
            let card = deck[i];
            // Animation Carte AOS et Attribution valeur du tableau deck
            setTimeout(() => {
                delay = delay + 50;
                // Animation
                col.setAttribute('data-aos-delay', delay);
                col.classList.add('aos-animate');

                // Attribution
                col.setAttribute('data-card',  card);
                col.querySelector('.flip-card-back').innerText =  card;
                // col.querySelector('.flip-card-front').innerText =  card;
            }, 350);

            col.addEventListener('click', () => { // clique sur cellule
                // Si win = true => annule le click event
                if (win) return;

                // Mise à jour du score dans l'HTML
                score++; // Incrémentation
                if (score % 2 == 0) {
                    $USER_SCORE.innerText = score / 2;
                };

                // Animation flip carte cliquée
                col.classList.add('animated');
               
                // Delai pour laisser le temps à l'animation FLIP
                setTimeout(() => {
                    colStorage = memory.colStorageCheck(colStorage, col);
                   
                    let colsPaired = document.querySelectorAll('.paired');

                    if (colsPaired.length == $COLS.length) { // Si le nombre de carte.paired = le nombre de carte totale = WIN
                        win = true;
                        let $container = document.getElementById('container');

                        const USER_STORAGE = JSON.parse(localStorage.getItem('users'));
                        const USER_SESSION = JSON.parse(sessionStorage.getItem('user'));

                        USER_STORAGE.forEach((user) => {
                            if(USER_SESSION['name'] == user['name']) {
                                let game = {};
                                let date = new Date();
        
                                game['score'] = score / 2;
                                game['date'] = date;

                                if(user['games']) {
                                    user['games'].push(game);
                                } else {
                                    const GAMES = [];
                                    GAMES.push(game);
                                    user['games'] = GAMES;
                                }
                            };
                        });

                        localStorage.setItem("users", JSON.stringify(USER_STORAGE)); // Mise à jour
                
                        memory.aosOut($container); // Fonction d'animation de sortie de contenu
                
                        setTimeout(() => {
                            $MEMORY_CONTAINER.innerHTML = '';
                            $USER_SCORE.classList.add('text-9xl');
                           
                            memory.aosIn($container); // Fonction d'animation d'entrée de contenu
                        }, 1400);
                    }
                }, 800);
            });
        });
    });

    document.addEventListener('keydown', (event) => {
        if(event.key == ' ' || event.code == "Space") {
            let $container = document.getElementById('container'); 
            memory.aosOut($container); 

            setTimeout(() => {
                $MEMORY_CONTAINER.innerHTML = '';
                $USER_SCORE.innerText = '0';
                $USER_SCORE.classList.remove('text-9xl');

                let deck = memory.memoryBuilder($MEMORY_CONTAINER, 4, 4).sort(() => Math.random() - 0.5); // Si positif A apres B, Si négatif A avant B
               
               // Récupération de toute les cartes présente après construction de la grille
                const $COLS = document.querySelectorAll('.flip-card');

                // Initialisation des variables de la partie :
                let score = 0;
                let colStorage;
                let win = false;

                $COLS.forEach((col, i) => {
                    // Selection de la carte
                    let card = deck[i];
                    // Attribution
                    col.setAttribute('data-card',  card);
                    col.querySelector('.flip-card-back').innerText =  card;
                    // col.querySelector('.flip-card-front').innerText =  card;
                    // Animation Carte AOS et Attribution valeur du tableau deck
                    memory.aosIn($container);

                    col.addEventListener('click', () => { // clique sur cellule
                        // Si win est false
                        if (!win) {
                            // Mise à jour du score dans l'HTML
                            score++; // Incrémentation
                            if (score % 2 == 0) {
                                $USER_SCORE.innerText = score / 2;
                            };
                            // Animation flip carte cliquée
                            col.classList.add('animated');
                            // Delai pour laisser le temps à l'animation FLIP
                            setTimeout(() => {
                                colStorage = memory.colStorageCheck(colStorage, col);
                            
                                let colsPaired = document.querySelectorAll('.paired'); // Récupération de toutes les cartes avec la classe paired

                                if (colsPaired.length == $COLS.length) { // Si le nombre de carte.paired = le nombre de carte totale = WIN
                                    win = true;
                                    let $container = document.getElementById('container');
                                    const USER_STORAGE = JSON.parse(localStorage.getItem('users'));
                                    const USER_SESSION = JSON.parse(sessionStorage.getItem('user'));
            
                                    USER_STORAGE.forEach((user) => {
                                        if(USER_SESSION['name'] == user['name']) {
                                            let game = {};
                                            let date = new Date();
                    
                                            game['score'] = score / 2;
                                            game['date'] = date;
            
                                            if(user['games']) {
                                                user['games'].push(game);
                                                sessionStorage.setItem("user", JSON.stringify(user));
                                            } else {
                                                const GAMES = [];
                                                GAMES.push(game);
                                                user['games'] = GAMES;
                                                sessionStorage.setItem("user", JSON.stringify(user));
                                            };
                                            
                                        };
                                    });
                                    localStorage.setItem("users", JSON.stringify(USER_STORAGE)); // Mise à jour

                                    memory.aosOut($container); // Fonction d'animation de sortie de contenu

                                    setTimeout(() => {
                                        $MEMORY_CONTAINER.innerHTML = '';
                                        $USER_SCORE.classList.add('text-9xl');
                                    
                                        memory.aosIn($container); // Fonction d'animation d'entrée de contenu
                                    }, 900);
                                }
                            }, 800);
                        };
                    });
                });      
            }, 1000);
        };
    });
});