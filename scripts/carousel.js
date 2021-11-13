
/*------------------------ Uso del complemento Glider.js para efectos del carrusel de imagenes -------------------------*/
/* -------- https://nickpiscitelli.github.io/Glider.js/ --------- */

window.addEventListener('load', function () {
  new Glider(document.querySelector('.carousel__lista'), {
      //Indicadores de pagina del carousel
        slidesToShow: 2,
        slidesToScroll: 2,
      dots: '.carousel__indicadores',
        //Movimiento de las flechas izquierda/derecha
        arrows: {
           prev: '.carousel__anterior',
           next: '.carousel__siguiente'
      },
        
        //Modificar cuantas imagenes se ven dependiendo de los tamaños de dispositivo
         responsive: [
            {
              // screens greater than >= 775px
              breakpoint: 450,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },{
              // screens greater than >= 1024px
              breakpoint: 800,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5
               }
             }
        ]
    });
});