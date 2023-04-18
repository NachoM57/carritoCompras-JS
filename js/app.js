//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //eliminar cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //vaciar el carrito 
    vaciarCarritoBtn.addEventListener("click", () => {
articulosCarrito = []; //reseteamos el arreglo

limpiarHTML(); //eliminamos todo el html
    })
}

//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //iteral sobre el carrito y mostrar su html
    }
}


//lee el contenido del html que le dimos click y extrae la informacion del curso 
function leerDatosCurso(curso) {
    //console.log(curso);


    //crear un objeto con el contenido de curso actual
    const infoCurso = {
        Imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorno los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo del carrito 
        articulosCarrito = [...articulosCarrito, infoCurso]
    }


    console.log(articulosCarrito);

    carritoHTML();
}

//muestra el carrito de compras en el html
function carritoHTML() {

    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const { Imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML =
            `<td><img src="${Imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>`;

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

}

//elimina los cursos del html
function limpiarHTML() {
    contenedorCarrito.innerHTML = "";
}