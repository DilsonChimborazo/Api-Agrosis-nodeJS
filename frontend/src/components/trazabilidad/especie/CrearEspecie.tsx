import { useCrearEspecie } from '@/hooks/trazabilidad/especie/useCrearEspecie';
import { useEspecie } from '@/hooks/trazabilidad/especie/useEspecie';
import Formulario from '../../globales/Formulario';
import { useNavigate } from 'react-router-dom';

const CrearEspecie = () => {
  const mutation = useCrearEspecie();
  const { data: especies = [], isLoading } = useEspecie();
  const navigate = useNavigate();

  const tipoCultivoMap = new Map<number, { value: string; label: string }>();
  especies.forEach((especie) => {
    const tipo = especie.tipo_cultivo;
    if (tipo) {
      tipoCultivoMap.set(tipo.id_tipo_cultivo, {
        value: tipo.id_tipo_cultivo.toString(),
        label: tipo.nombre,
      });
    }
  });

  const tipoCultivoOptions = Array.from(tipoCultivoMap.values());

  const formFields = [
    { id: 'nombre_comun', label: 'Nombre Común', type: 'text' },
    { id: 'nombre_cientifico', label: 'Nombre Científico', type: 'text' },
    { id: 'descripcion', label: 'Descripción', type: 'text' },
    {
      id: 'fk_id_tipo_cultivo',
      label: 'Tipo de Cultivo',
      type: 'select',
      options: tipoCultivoOptions,
    },
  ];

  const handleSubmit = (formData: { [key: string]: string }) => {
    if (
      !formData.nombre_comun ||
      !formData.nombre_cientifico ||
      !formData.descripcion ||
      !formData.fk_id_tipo_cultivo
    ) {
      console.error("❌ Todos los campos son obligatorios");
      return;
    }

    mutation.mutate({
      id: 0,
      nombre_comun: formData.nombre_comun.trim(),
      nombre_cientifico: formData.nombre_cientifico.trim(),
      descripcion: formData.descripcion.trim(),
      fk_id_tipo_cultivo: parseInt(formData.fk_id_tipo_cultivo),
    }, {
      onSuccess: () => {
        navigate("/especies");
      },
      onError: (error) => {
        console.error("❌ Error al crear especie:", error);
      },
    });
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando tipos de cultivo...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formulario
        fields={formFields}
        onSubmit={handleSubmit}
        isError={mutation.isError}
        isSuccess={mutation.isSuccess}
        title="Registrar Nueva Especie"
      />
    </div>
  );
};

export default CrearEspecie;
