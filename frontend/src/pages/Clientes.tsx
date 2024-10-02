import "./Clientes.css";

const clientesFalsos = [
  {
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    genero: "Masculino",
    telefono: "555-1234",
    fechaCreacion: "2023-01-15",
    reservas: 3,
  },
  {
    nombre: "Ana Gómez",
    correo: "ana.gomez@example.com",
    genero: "Femenino",
    telefono: "555-5678",
    fechaCreacion: "2022-11-20",
    reservas: 5,
  },
  {
    nombre: "Carlos Díaz",
    correo: "carlos.diaz@example.com",
    genero: "Masculino",
    telefono: "555-9876",
    fechaCreacion: "2021-09-12",
    reservas: 2,
  },
  {
    nombre: "María Fernández",
    correo: "maria.fernandez@example.com",
    genero: "Femenino",
    telefono: "555-2468",
    fechaCreacion: "2022-05-30",
    reservas: 7,
  },
];

export default function Clientes() {
  return (
    <div className="client-page">
      <div className="background-image" />
      <div className="client-container">
        <div className="titulo">
          <h1>REGISTROS</h1>
          <hr />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Género</th>
              <th>Teléfono</th>
              <th>Creación</th>
              <th>Reservas</th>
            </tr>
          </thead>
          <tbody>
            {clientesFalsos.map((cliente, index) => (
              <tr key={index}>
                <td data-label="Nombre">{cliente.nombre}</td>
                <td data-label="Correo">{cliente.correo}</td>
                <td data-label="Género">{cliente.genero}</td>
                <td data-label="Teléfono">{cliente.telefono}</td>
                <td data-label="Creación">{cliente.fechaCreacion}</td>
                <td data-label="Reservas">{cliente.reservas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
