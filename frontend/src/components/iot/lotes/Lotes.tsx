import { useState } from 'react';
import { useLotes } from '../../../hooks/iot/lote/useLotes';
import Tabla from '../../globales/Tabla';
import VentanaModal from '../../globales/VentanasModales';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const Lotes = () => {
  const { data: lotes, isLoading, error } = useLotes();
  const [selectedLote, setSelectedLote] = useState<object | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModalHandler = (lote: object) => {
    setSelectedLote(lote);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLote(null);
    setIsModalOpen(false);
  };

  const handleUpdate = (residuo: { id: number }) => {
    navigate(`/Editarlote/${residuo.id}`);
  };

  const headers = ['ID', 'Nombre', 'Dimencion', 'ubicacion', 'Estado'];

  const handleRowClick = (lote: object) => {
    openModalHandler(lote);
  };
  const handleCreate = () => {
    navigate("/Crear-lote");
  };

  if (isLoading) return <div>Cargando lotes...</div>;
  if (error instanceof Error) return <div>Error al cargar los lotes: {error.message}</div>;

  const lotesList = Array.isArray(lotes) ? lotes : [];

  const mappedLotes = lotesList.map((lote,index) => ({
    id: index + 1,
    nombre: lote.nombre_lote,
    dimencion: lote.dimension,
    ubicacion: lote.fk_id_ubicacion 
      ? `${lote.fk_id_ubicacion.latitud}, ${lote.fk_id_ubicacion.longitud}` 
      : 'Sin ubicación',
    estado: lote.estado,
  }));

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text('Lotes activos', 14, 10);

    const tableData = mappedLotes.map((lote) => [
      lote.id,
      lote.dimencion,
      lote.nombre,
      lote.ubicacion,
      lote.estado,
    ]);

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 20,
    });

    doc.save('Lotes.activos.pdf')
  }
 

  return (
    <div className="overflow-x-auto  rounded-lg">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={generarPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Reporte PDF
        </button>
      </div>
      <Tabla
        title="Lotes"
        headers={headers}
        data={mappedLotes}
        onClickAction={handleRowClick}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        createButtonTitle="Crear"
      />
      {selectedLote && (
        <VentanaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          titulo="Detalles del Lote"
          contenido={selectedLote} 
        />
      )}
    </div>
  );
};

export default Lotes;
