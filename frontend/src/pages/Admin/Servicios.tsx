import React, { ChangeEvent, useState } from "react";
import Dropdown from "../../components/Dropdown";

type Servicio = {
  img: string;
  titulo: string;
  descripcion: string;
  precio: number;
};

type Servicios = {
  [key: string]: Servicio[];
};

type DataState = {
  tipoTratamiento: string;
  servicio: string;
};

type ServicesSectionProps = {
  services: Servicios;
  setServices: (services: Servicios) => void;
};

export function ServicesSection({
  services,
  setServices,
}: ServicesSectionProps) {
  const [precioNuevo, setPrecioNuevo] = useState<number>(0);

  const [titulo, setTitulo] = useState("");
  const [text, setText] = useState("");
  const [, /*image*/ setImage] = useState<File | null>(null); // image es lo que se debe mandar a la base de datos
  const [imagePreviewServicio, setImagePreviewServicio] = useState<
    string | null
  >(null); // imagePreviewNew es la version URL de image, para poder verla necesitamos string

  const [Data, setData] = useState<DataState>({
    tipoTratamiento: "",
    servicio: "",
  });

  const handleChangeOptions = (name: string, value: string) => {
    const ServiceData: DataState = { ...Data, [name]: value };

    if (name === "tipoTratamiento") {
      ServiceData.servicio = ""; // Reiniciar el servicio cuando se cambia el tipo de tratamiento
      setTitulo("");
      setText("");
      setPrecioNuevo(0);
    }
    if (name === "servicio") {
      const selectedService = services[ServiceData.tipoTratamiento]?.find(
        (serv) => serv.titulo === value
      );
      if (selectedService) {
        setTitulo(selectedService.titulo);
        setText(selectedService.descripcion);
        setPrecioNuevo(selectedService.precio);
      } else {
        setTitulo("");
        setText("");
        setPrecioNuevo(0);
      }
    }
    setData(ServiceData); // Actualiza el estado con el nuevo objeto
  };

  function handleChangePrecio(event: React.ChangeEvent<HTMLInputElement>) {
    setPrecioNuevo(Number(event.target.value));
  }
  function handleInputChangeServicio(event: ChangeEvent<HTMLInputElement>) {
    setTitulo(event.target.value);
  }
  function handleTextAreaChangeServicio(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    setText(event.target.value);
  }
  const handleImageChangeServicio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewServicio(previewUrl);
    }
  };

  function handleUpdateServicio() {
    const updatedServices = services[Data.tipoTratamiento]?.map((servicio) =>
      servicio.titulo === Data.servicio
        ? {
            ...servicio,
            titulo: titulo,
            descripcion: text,
            precio: precioNuevo,
          }
        : servicio
    );
    setServices({
      ...services,
      [Data.tipoTratamiento]: updatedServices || [],
    });
  }

  function handleDeleteService() {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, deberas subirlo de nuevo.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedServicios = {
          ...services,
          [Data.tipoTratamiento]:
            services[Data.tipoTratamiento]?.filter(
              (servicio) => servicio.titulo !== Data.servicio
            ) || [],
        };

        setServices(updatedServicios);
        setTitulo("");
        setText("");
        setPrecioNuevo(0);
        setImage(null);
        setImagePreviewServicio(null);
        swal({
          title: "Servicio eliminado",
          icon: "success",
          timer: 1000,
        });
      }
    });
  }

  return (
    <div className="services-section">
      <h3>Servicios</h3>
      <div className="buttons">
        <div className="par">
          <Dropdown
            label="Tipo"
            options={Object.keys(services)}
            onChange={(selectedOption) =>
              handleChangeOptions("tipoTratamiento", selectedOption)
            }
          />
          <Dropdown
            label="Servicio"
            options={
              services[Data.tipoTratamiento]?.map(
                (servicio) => servicio.titulo
              ) || []
            }
            onChange={(selectedOption) =>
              handleChangeOptions("servicio", selectedOption)
            }
          />
        </div>
      </div>

      <form
        className="buttons"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateServicio();
        }}
      >
        <div className="par">
          <input
            className="textbox"
            name="titulo"
            type="text"
            value={titulo}
            onChange={handleInputChangeServicio}
            placeholder="Título"
          />
          <textarea
            className="textbox"
            name="text"
            value={text}
            onChange={handleTextAreaChangeServicio}
            placeholder="Descripción"
          />
          <input
            id="precio"
            type="number"
            className="textbox"
            value={precioNuevo}
            onChange={handleChangePrecio}
            placeholder="Precio"
          />
        </div>
        <div className="par">
          <div className="SecondButton">
            <label htmlFor="file-upload-servicio">Subir imagen</label>
            <input
              id="file-upload-servicio"
              type="file"
              accept="image/*"
              onChange={handleImageChangeServicio}
              style={{ display: "none" }}
            />
          </div>
          <input className="MainButton" type="submit" value="Guardar" />
          <button
            className="SecondButton"
            onClick={() => handleDeleteService()}
          >
            Borrar
          </button>
        </div>
      </form>
      {imagePreviewServicio && (
        <div className="image-preview">
          <p>Vista previa:</p>
          <img src={imagePreviewServicio} alt="Vista previa" />
        </div>
      )}
    </div>
  );
}

export default ServicesSection;
