const db = firebase.firestore();

const formulario = document.getElementById("formulario");
const listaFormulario = document.getElementById("listaFormulario");

let editStatus = false;
let id = '';

/**
 * @param {string} departamento
 * @param {string} encargado 
 * @param {string} nombreRouter
 * @param {string} contrasena 
 * @param {string} fechaCambio 
 */
const saveRouter = (departamento, encargado, nombreRouter, contrasena, fechaCambio) =>
  db.collection("router").doc().set({
    departamento,
    encargado,
    nombreRouter,
    contrasena,
    fechaCambio,
  });

const getRouters = () => db.collection("router").get();

const onGetRouter = (callback) => db.collection("router").onSnapshot(callback);

const deleteRouter = (id) => db.collection("router").doc(id).delete();

const getRouter = (id) => db.collection("router").doc(id).get();

const updateRouter = (id, updateRouter) => db.collection('router').doc(id).update(updateRouter);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetRouter((querySnapshot) => {
    listaFormulario.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const route = doc.data();

      listaFormulario.innerHTML += `
      <div class="col-lg-4">
                    <div class="user-block block text-center">
                    <div class="avatar"><img src="https://img2.pngio.com/adsl-access-point-router-internet-wifi-signal-free-icon-of-access-point-icon-png-512_512.png" alt="..." class="img-fluid">
                    </div><a class="user-title">
                        <h3 class="h5">${doc.data().nombreRouter}</h3></a>
                    <div class="contributions">${doc.data().contrasena}</div>
                    <div><br>
                      <button class="btn btn-secondary btn-delete" data-id="${doc.id}">Eliminar</button>
                      <button class="btn btn-primary btn-edit" data-toggle="modal" data-target="#myModal" data-id="${doc.id}">Editar</button>
                    </div>
                    <div class="user-block text-center"><br>
                        <a class="user-title" align="center">
                        <h3 class="h5 text-primary">${doc.data().departamento}</h3></a>
                        <a class="user-title" align="center">
                        <h3 class="h5"> ${doc.data().fechaCambio}</h3></a>
                    </div>
                    </div>
                </div>`;

                const btnsDelete = document.querySelectorAll(".btn-delete");
                btnsDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    await deleteRouter(e.target.dataset.id);
                })
                });

                const btnsEdit = document.querySelectorAll(".btn-edit");
                btnsEdit.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    const doc = await getRouter(e.target.dataset.id);
                    const router = doc.data();

                    editStatus = true;
                    id = doc.id;

                    formulario['departamento'].value = router.departamento;
                    formulario['encargado'].value = router.encargado;
                    formulario['nombreRouter'].value = router.nombreRouter;
                    formulario['contrasena'].value = router.contrasena;
                    formulario['fechaCambio'].value = router.fechaCambio;
                    formulario['btn-formulario'].innerText = 'Editar';
                })
                });
    });
  });
});




formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const departamento = formulario["departamento"];
  const encargado = formulario["encargado"];
  const nombreRouter = formulario["nombreRouter"];
  const contrasena = formulario["contrasena"];
  const fechaCambio = formulario["fechaCambio"];

    if (!editStatus) {
      await saveRouter(departamento.value, encargado.value, nombreRouter.value, contrasena.value, fechaCambio.value);
    } else {
      await updateRouter(id, {
        departamento: departamento.value,
        encargado: encargado.value,
        nombreRouter: nombreRouter.value,
        contrasena: contrasena.value,
        fechaCambio: fechaCambio.value,
      });
      editStatus = false;
      formulario['btn-formulario'].innerText = 'Guardar';

    }

    await getRouters();
    formulario.reset();
    // title.focus();
});