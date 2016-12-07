# ANIMATEXT #

----------
[http://www.oscarlijo.com/animatext/](http://www.oscarlijo.com/animatext/ "animatext")
<br><br>
**animatext.js** es un plugin de jQuery compatible con Zepto.js hecho con CoffeeScript.

*La version minificada de animatext pesa menos de 3kb!*

## Formas de instalar la librería ##

Desde el instalador de paquetes de node:

    npm install animatext

Usando bower:

    bower install animatext

Desde un CDN:

    //cdn.jsdelivr.net/animatext/latest/animatext.min.js
    
<br><br>
## INICIALIZACION DE LA LIBRERIA ##

Para inicializar animatext unicamente debemos cargar el archivo **animatext.min.js** si estamos en un entorno productivo, o el archivo **animatext.js** si estamos desarrollando y queremos modificar la libería.

Unicamente debemos cargar un archivo js, pero hay que tener en cuenta que esta librería tiene dos dependencias, la primera al tratarse de un plugin es cargar previamente la librería para la que fue desarrollado, en este caso es compatible tanto con *jquery* como con *zepto.js*.

En segundo lugar para realizar las animaciones esta librería se apoya en **animate.css** de manera que tambien lo tendremos que incorporar a nuestra pagina.

Despues podemos arrancar sobre uno o varios elementos del dom el plugin con el siguiente codigo:

    $(".mis-elementos").animatext();

<br><br>
## EJEMPLOS ##

Para mas información y ver ejemplos de como funciona visita la página oficial:

[http://www.oscarlijo.com/animatext/](http://www.oscarlijo.com/animatext/ "animatext")