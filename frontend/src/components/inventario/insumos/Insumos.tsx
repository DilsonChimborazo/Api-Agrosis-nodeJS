import { useEffect, useState } from 'react';
import { useInsumo } from '../../../hooks/inventario/insumos/useInsumo';
import { Insumo } from '../../../hooks/inventario/insumos/useInsumo';
import Tabla from '../../globales/Tabla';
import VentanaModal from '../../globales/VentanasModales';
import { useNavigate } from 'react-router-dom';
import Button from "@/components/globales/Button";

const Insumos = () => {
  const { data: insumo, isLoading, error } = useInsumo();
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedInsumo) {
      console.log("Insumo seleccionado:", selectedInsumo);
    }
  }, [selectedInsumo]);

  const openModalHandler = (insumo: Insumo) => {
    setSelectedInsumo(insumo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInsumo(null);
    setIsModalOpen(false);
  };

  const headers = ["ID", "Nombre", "Tipo", "Precio Unidad", "Cantidad", "Unidad de Medida"];

  const handleRowClick = (insumo: Insumo) => {
    openModalHandler(insumo);
  };

  const handleUpdate = (residuo: { id: number }) => {
    navigate(`/ActualizarInsumos/${residuo.id}`);
  };

  const generarPDF = () => {
    console.log("Generando PDF...");
    // Aquí puedes implementar la lógica para generar el PDF con jsPDF, pdfmake, etc.
  };

  if (isLoading) return <div className="text-gray-500">Cargando insumos...</div>;
  if (error instanceof Error) return <div className="text-red-500">Error al cargar los insumos: {error.message}</div>;

  const InsumoList = Array.isArray(insumo) ? insumo : [];

  const mappedInsumo = Array.isArray(InsumoList)
    ? InsumoList.map(insumo => ({
        id: insumo.id,
        nombre: insumo.nombre,
        tipo: insumo.tipo,
        precio_unidad: insumo.precio_unidad,
        cantidad: insumo.cantidad,
        unidad_medida: insumo.unidad_medida,
      }))
    : [];

  console.log("mappedInsumo:", mappedInsumo, Array.isArray(mappedInsumo));

  return (
    <div className="mx-auto p-4">
      <div className="flex gap-4 mb-4">
        <Button
          text="Crear insumos"
          onClick={() => navigate("/CrearInsumos")}
          variant="green"
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={generarPDF}
        >
          Descargar PDF
        </button>
      </div>

      <Tabla
        title="Insumos"
        headers={headers}
        data={mappedInsumo}
        onClickAction={handleRowClick}
        onUpdate={handleUpdate}
      />

      {selectedInsumo && (
        <VentanaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          titulo="Detalles del Insumo"
          contenido={selectedInsumo}
        />
      )}
    </div>
  );
};

export default Insumos;