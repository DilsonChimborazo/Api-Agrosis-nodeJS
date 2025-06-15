import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAsignacionporId } from "../../../hooks/trazabilidad/asignacion/useAsignacionPorId";
import { useEditarAsignacion } from "../../../hooks/trazabilidad/asignacion/useEditarAsignacion";
import { useUsuarios } from "@/hooks/usuarios/useUsuarios";
import { useAsignacion } from "@/hooks/trazabilidad/asignacion/useAsignacion";
import Formulario from "../../globales/Formulario";

const ActualizarAsignacion = () => {
  const { id } = useParams(); // Obtener ID de la URL
  const { data: asignacion, isLoading, error } = useAsignacionporId(id); // Hook para obtener datos por ID
  const actualizarAsignacion = useEditarAsignacion(); // Hook para actualizar
  const { data: usuarios = [] } = useUsuarios(); // Hook para obtener la lista de usuarios
  const { data: asignaciones = [] } = useAsignacion(); // Hook para obtener actividades
  const navigate = useNavigate();

  // Estado inicial del formulario
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    fecha: "",
    fk_id_actividad: "",
    fk_identificacion: "", // Corregido a fk_identificacion para consistencia
  });

  // Cargar los datos de la asignación en el formulario cuando se obtengan
  useEffect(() => {
    if (asignacion && Object.keys(asignacion).length > 0) {
      console.log("🔄 Actualizando formulario con:", asignacion);

      setFormData({
        fecha: asignacion.fecha || "",
        fk_id_actividad: asignacion.fk_id_actividad?.toString() || "", // Convertir a string para el formulario
        fk_identificacion: asignacion.fk_identificacion?.toString() || "", // Corregido a fk_identificacion
      });
    }
  }, [asignacion]);

  // Mapeo de opciones para el select de actividades
  const actividadOptions = Array.from(
    new Map(
      asignaciones.map((asignacion) => [
        asignacion.fk_id_actividad.id.toString(),
        {
          value: asignacion.fk_id_actividad.id.toString(),
          label: asignacion.fk_id_actividad.nombre_actividad || "Sin nombre",
        },
      ])
    ).values()
  );

  // Mapeo de opciones para el select de usuarios
  const usuarioOptions = usuarios.map((usr) => ({
    value: usr.id.toString(),
    label: `${usr.nombre || "Sin nombre"} ${usr.apellido || ""}`.trim() || "Usuario sin nombre",
  }));

  // Definir los campos del formulario
  const formFields = [
    { id: "fecha", label: "Fecha", type: "date", required: true },
    {
      id: "fk_id_actividad",
      label: "Actividad",
      type: "select",
      options: actividadOptions,
      required: true,
    },
    {
      id: "fk_identificacion",
      label: "Usuario",
      type: "select",
      options: usuarioOptions,
      required: true,
    },
  ];

  // Manejar el envío del formulario
  const handleSubmit = (data: { [key: string]: string }) => {
    if (!id) return;

    // Validar campos obligatorios
    const requiredFields = ["fecha", "fk_id_actividad", "fk_identificacion"];
    const missingFields = requiredFields.filter((field) => !data[field] || data[field] === "");
    if (missingFields.length > 0) {
      console.warn(`Campos obligatorios faltantes: ${missingFields.join(", ")}`);
      return;
    }

    const asignacionActualizada = {
      id: Number(id), // Convertir ID a número
      fecha: data.fecha || "",
      fk_id_actividad: parseInt(data.fk_id_actividad) || 0, // Convertir a número
      fk_identificacion: parseInt(data.fk_identificacion) || 0, // Corregido a fk_identificacion
    };

    console.log("🚀 Enviando datos al backend:", asignacionActualizada); // Verifica los datos enviados

    actualizarAsignacion.mutate(asignacionActualizada, {
      onSuccess: () => {
        console.log("✅ Asignación actualizada correctamente");
        navigate("/asignacion_actividad"); // Redirigir tras el éxito
      },
      onError: (error: any) => {
        console.error("❌ Error al actualizar la asignación:", error.message || error);
      },
    });
  };

  // Mostrar estados de carga o error
  if (isLoading) return <div className="text-gray-500">Cargando datos...</div>;
  if (error) return <div className="text-red-500">Error al cargar la asignación: {error.message}</div>;

  console.log("📌 Estado actual de formData:", formData);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formulario
        fields={formFields}
        onSubmit={handleSubmit}
        isError={actualizarAsignacion.isError}
        isSuccess={actualizarAsignacion.isSuccess}
        title="Actualizar Asignación"
        initialValues={formData}
        key={JSON.stringify(formData)} // Forzar re-render cuando cambien los datos
      />
    </div>
  );
};

export default ActualizarAsignacion;