import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAsignacionporId } from "../../../hooks/trazabilidad/asignacion/useAsignacionPorId";
import { useEditarAsignacion } from "../../../hooks/trazabilidad/asignacion/useEditarAsignacion";
import { useUsuarios } from "@/hooks/usuarios/useUsuarios";
import { useAsignacion } from "@/hooks/trazabilidad/asignacion/useAsignacion";
import Formulario from "../../globales/Formulario";

const ActualizarAsignacion = () => {
  const { id } = useParams();
  const { data: asignacion, isLoading, error } = useAsignacionporId(id);
  const actualizarAsignacion = useEditarAsignacion();
  const { data: usuarios = [] } = useUsuarios();
  const { data: asignaciones = [] } = useAsignacion();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    fecha: "",
    fk_id_actividad: "",
    fk_identificacion: "",
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para rastrear la carga

  // Cargar los datos de la asignación en el formulario cuando se obtengan
  useEffect(() => {
    if (asignacion && Object.keys(asignacion).length > 0) {
      console.log("🔄 Datos de la asignación recibidos:", JSON.stringify(asignacion, null, 2));
      const initialData = {
        fecha: asignacion.fecha || "",
        fk_id_actividad: asignacion.fk_id_actividad?.toString() || "",
        fk_identificacion: asignacion.fk_identificacion?.toString() || "",
      };
      setFormData(initialData);
      setIsDataLoaded(true); // Marcar como cargado
      console.log("📋 formData inicializado con:", JSON.stringify(initialData, null, 2));
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

  // Preseleccionar la opción correcta en los selects
  const getInitialSelectValue = (field: string, options: { value: string; label: string }[]) => {
    if (formData[field] && options.some((opt) => opt.value === formData[field])) {
      return formData[field];
    }
    return "";
  };

  // Definir los campos del formulario
  const formFields = [
    { id: "fecha", label: "Fecha", type: "date", required: true, value: formData.fecha },
    {
      id: "fk_id_actividad",
      label: "Actividad",
      type: "select",
      options: actividadOptions,
      required: true,
      value: getInitialSelectValue("fk_id_actividad", actividadOptions),
    },
    {
      id: "fk_identificacion",
      label: "Usuario",
      type: "select",
      options: usuarioOptions,
      required: true,
      value: getInitialSelectValue("fk_identificacion", usuarioOptions),
    },
  ];

  // Manejar el envío del formulario
  const handleSubmit = (data: { [key: string]: string }) => {
    if (!id) return;

    const requiredFields = ["fecha", "fk_id_actividad", "fk_identificacion"];
    const missingFields = requiredFields.filter((field) => !data[field] || data[field] === "");
    if (missingFields.length > 0) {
      console.warn(`Campos obligatorios faltantes: ${missingFields.join(", ")}`);
      return;
    }

    const asignacionActualizada = {
      id: Number(id),
      fecha: data.fecha || "",
      fk_id_actividad: parseInt(data.fk_id_actividad) || 0,
      fk_identificacion: parseInt(data.fk_identificacion) || 0,
    };

    console.log("🚀 Enviando datos al backend:", asignacionActualizada);

    actualizarAsignacion.mutate(asignacionActualizada, {
      onSuccess: () => {
        console.log("✅ Asignación actualizada correctamente");
        navigate("/asignacion_actividad");
      },
      onError: (error: any) => {
        console.error("❌ Error al actualizar la asignación:", error.message || error);
      },
    });
  };

  // Mostrar estados de carga o error
  if (isLoading) return <div className="text-gray-500">Cargando datos...</div>;
  if (error) return <div className="text-red-500">Error al cargar la asignación: {error.message}</div>;
  if (!isDataLoaded) return <div className="text-gray-500">Cargando formulario...</div>;

  console.log("📌 Estado actual de formData:", JSON.stringify(formData, null, 2));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formulario
        fields={formFields}
        onSubmit={handleSubmit}
        isError={actualizarAsignacion.isError}
        isSuccess={actualizarAsignacion.isSuccess}
        title="Actualizar Asignación"
        initialValues={formData}
        key={JSON.stringify(formData)}
      />
    </div>
  );
};

export default ActualizarAsignacion;