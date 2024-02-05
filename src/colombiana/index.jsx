import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { setNewUser } from "../db/firebase";

let timeout = null;
let contador = 0;
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

export default function index() {
  const form = useRef();
  const [tab, setTab] = useState(0);
  const [send, setSend] = useState(0);
  const [show, setShow] = useState(false);

  const next = () => setTab((old) => old + 1);

  useEffect(() => {
    localStorage.setItem("next", JSON.stringify(new Date().addHours(1)));
  }, []);

  useEffect(() => {
    const date = JSON.parse(localStorage.getItem("next"));
    const fecha = date ? new Date(date) : new Date();
    console.log(fecha);
  }, [tab]);

  const registrar = (registrados) => {
    const items = JSON.parse(localStorage.getItem("usuarios")) || [];
    registrados.forEach((registro) => items.push(registro));
    localStorage.setItem("usuarios", JSON.stringify(items));
    setTimeout(next, 1000);
  };

  const showCMS = () => {
    timeout && clearTimeout(timeout);
    contador++;
    timeout = setTimeout(() => (contador = 0), 1000);
    contador >= 6 && setShow(true);
  };

  const submit = () => {
    const fields = ["nombre", "telefono", "correo", "ciudad"];
    const registrados = [];
    const list = [...Array(5).keys()];
    const fecha = new Date().toString();
    list.forEach((k) => {
      const user = { fecha };
      fields.forEach(
        (name) => (user[name] = form.current[`${name}${k + 1}`].value)
      );
      if (user.correo) {
        validEmailRegex.test(user.correo)
          ? registrados.push(user)
          : alert(`Correo ${user.correo} no es válido`);
      }
    });
    registrados.length > 0
      ? registrar(registrados)
      : alert("Debes registrar al menos un usuario");
  };

  const sortear = () => {
    let win = false;
    const date = JSON.parse(localStorage.getItem("next"));
    const fecha = date ? new Date(date) : new Date();
    console.log(fecha);
    if (new Date() > fecha) {
      win = true;
      localStorage.setItem("next", JSON.stringify(new Date().addHours(1)));
    }
    win ? next() : setTab(5);
  };

  const enviarInscritosFirebase = () =>
    setSend((old) => {
      timeout && clearTimeout(timeout);
      if (old > 6) {
        const items = JSON.parse(localStorage.getItem("usuarios")) || [];
        console.log(items);
        items.forEach((user) => setNewUser("DBColombiana", user, user.correo));
        localStorage.setItem("usuarios", JSON.stringify([]));
        alert("Datos enviados a la base de datos");
      }
      timeout = setTimeout(() => {
        setSend(0);
      }, 1000);
      return old + 1;
    });

  const aplazarContador = () => {
    localStorage.setItem("next", JSON.stringify(new Date().addHours(1)));
  };

  const establecerGanador = () => {
    localStorage.setItem("next", JSON.stringify(new Date()));
  };

  const pausarJuego = () => {
    localStorage.setItem("next", JSON.stringify(new Date().addHours(20000)));
  };

  return (
    <div className="container center">
      {show ? (
        <div className="vertical cms">
          <button onClick={pausarJuego}>Detener</button>
          <button onClick={aplazarContador}>Iniciar</button>
          <button onClick={establecerGanador}>Entregar</button>
          <button onClick={() => setShow(false)}>Cerrar</button>
        </div>
      ) : null}
      {tab === 0 ? (
        <>
          <img src="/colombiana/P1.jpg" onClick={showCMS} />
          <div className="flex terminos">
            <div className="boton" onClick={next}>
              ACEPTO
            </div>
            <div
              className="boton"
              onClick={() => {
                setTab(5);
                setShow(false);
              }}
            >
              NO ACEPTO
            </div>
          </div>
        </>
      ) : null}
      {tab === 1 ? (
        <>
          <div className="atras" onClick={() => setTab(0)}></div>
          <img src="/colombiana/P2.jpg" onClick={enviarInscritosFirebase} />
          <form ref={form} className="registro">
            <div className="vertical">
              <div className="flex">
                <div className="vertical form_item">
                  <span>
                    NOMBRE
                    <input name="nombre1" type="text" />
                  </span>
                  <span>
                    TELÉFONO
                    <input name="telefono1" type="text" />
                  </span>
                  <span>
                    CORREO
                    <input name="correo1" type="text" />
                  </span>
                  <span>
                    CIUDAD
                    <input name="ciudad1" type="text" />
                  </span>
                </div>
                <div className="vertical form_item">
                  <span>
                    NOMBRE
                    <input name="nombre2" type="text" />
                  </span>
                  <span>
                    TELÉFONO
                    <input name="telefono2" type="text" />
                  </span>
                  <span>
                    CORREO
                    <input name="correo2" type="text" />
                  </span>
                  <span>
                    CIUDAD
                    <input name="ciudad2" type="text" />
                  </span>
                </div>
              </div>
              <div className="flex">
                <div className="vertical form_item">
                  <span>
                    NOMBRE
                    <input name="nombre3" type="text" />
                  </span>
                  <span>
                    TELÉFONO
                    <input name="telefono3" type="text" />
                  </span>
                  <span>
                    CORREO
                    <input name="correo3" type="text" />
                  </span>
                  <span>
                    CIUDAD
                    <input name="ciudad3" type="text" />
                  </span>
                </div>
                <div className="vertical form_item">
                  <span>
                    NOMBRE
                    <input name="nombre4" type="text" />
                  </span>
                  <span>
                    TELÉFONO
                    <input name="telefono4" type="text" />
                  </span>
                  <span>
                    CORREO
                    <input name="correo4" type="text" />
                  </span>
                  <span>
                    CIUDAD
                    <input name="ciudad4" type="text" />
                  </span>
                </div>
              </div>
              <div className="vertical center form_item">
                <span>
                  NOMBRE
                  <input name="nombre5" type="text" />
                </span>
                <span>
                  TELÉFONO
                  <input name="telefono5" type="text" />
                </span>
                <span>
                  CORREO
                  <input name="correo5" type="text" />
                </span>
                <span>
                  CIUDAD
                  <input name="ciudad5" type="text" />
                </span>
              </div>
            </div>
            <img
              className="submit"
              src="/colombiana/registrar.png"
              alt="registrar"
              onClick={submit}
            />
          </form>
        </>
      ) : null}
      {tab === 2 ? <img src="/colombiana/P3.jpg" onClick={next} /> : null}
      {tab === 3 ? (
        <>
          <img src="/colombiana/P4.jpg" />
          <form className="pregunta vertical">
            <label class="check">
              PEPSI
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="check">
              MANZANA
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="check">
              COLOMBIANA
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </form>
          <div className="enviar" onClick={sortear}></div>
        </>
      ) : null}
      {tab === 4 ? <img src="/colombiana/P5.jpg" onClick={next} /> : null}
      {tab === 5 ? (
        <img src="/colombiana/P6.jpg" onClick={() => setTab(0)} />
      ) : null}
    </div>
  );
}
