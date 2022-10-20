// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;
let screenDivider = 8;
let rayon = 10;
let angle = 0;
let angleY = 0;
let v1 = 1;
let v2 = 0.3;
let sizeR = 0.15 * 300 + 10;

function start() {
    // constante locale
    monCanvas = document.getElementById("canvas");
    monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
    monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
    monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
    monCanvas.style.height = window.innerHeight - 60 * pixelRatio;
    mesOutils = monCanvas.getContext("2d");
  
    // rayon par défaut
    rayon = window.innerHeight - 200;
  
    // lancement de la fonction de dessin
    animate();
  }

  // creation d'un fonction d'animation
// cette fonction sera appelée à chaque frame
function animate() {
    // on efface le canvas
    mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);
  
    // on dessine
    dessine();
  
    // on demande à rappeler la fonction animate
    // à la prochaine frame
    requestAnimationFrame(animate);
  }



  function dessine() {
    let x = monCanvas.width / 2.65;
    let y = monCanvas.height / 4;
  
    for(let j = 0; j < 18; j++){
      for(let i = 0; i < 18; i++){
        mesOutils.fillStyle = "rgb(50,50,50)";
        mesOutils.beginPath();
        mesOutils.arc(
        x + (i*50),
        y + (j*50),
        Math.abs(10 * Math.sin(angle * (Math.PI / (sizeR+j)))),
        0,
        2 * Math.PI,
        false
      );
      mesOutils.fill();
      mesOutils.closePath();
      }
    }


      // on fait augmenter l'angle
      angle += v2;
      if (angle > 360) {
        angle = 0;
      }
    
      // on fait augmenter l'angle
      angleY += v2;
      if (angleY > 360) {
        angleY = 0;
      }
   console.log(v1, v2)
  }
  
  // attente que tous les éléments soient chargés
  // utilisation d'une fonction anonyme en callback
  // --> pas de nom de fonction car pas besoin de la réutiliser
  window.onload = () => {
    start();
  };
  