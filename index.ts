type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
    id: number;
    monto: number;
    descripcion: string;
    tipo: TipoTransaccion;
}

let transacciones: Transaccion[] = [];
let balance = 0;



const montoInput = document.getElementById("monto") as HTMLInputElement;
const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
const listaTransacciones = document.getElementById("listaTransacciones")!;
const balanceElemento = document.getElementById("balance")!;

document.getElementById("agregarIngreso")!.addEventListener("click", () => agregarTransaccion("ingreso"));
document.getElementById("agregarGasto")!.addEventListener("click", () => agregarTransaccion("gasto"));

function agregarTransaccion(tipo: TipoTransaccion) {
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();

    if (isNaN(monto) || monto <= 0) {
        alert("El monto debe ser un número positivo.");
        return;
    }

    if (descripcion === "") {
        alert("La descripción no puede estar vacía.");
        return;
    }

    const nuevaTransaccion: Transaccion = {
        id: transacciones.length + 1,
        monto,
        descripcion,
        tipo
    };

    transacciones.push(nuevaTransaccion);
    actualizarBalance();
    mostrarTransacciones();
    
    montoInput.value = "";
    descripcionInput.value = "";
}

function actualizarBalance() {
    const ingresos = transacciones.filter(t => t.tipo === "ingreso").reduce((acc, t) => acc + t.monto, 0);
    const gastos = transacciones.filter(t => t.tipo === "gasto").reduce((acc, t) => acc + t.monto, 0);
    balance = ingresos - gastos;
    balanceElemento.textContent = balance.toFixed(2);
}

function mostrarTransacciones() {
    listaTransacciones.innerHTML = "";
    transacciones.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.descripcion}: $${t.monto.toFixed(2)}`;
        li.className = t.tipo;
        listaTransacciones.appendChild(li);
    });
}
