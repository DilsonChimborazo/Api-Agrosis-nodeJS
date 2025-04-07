import { useState } from 'react';
import { useEras } from '../../../hooks/iot/eras/useEras';
import Tabla from '../../globales/Tabla';
import VentanaModal from '../../globales/VentanasModales';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Eras = () => {
  const { data: eras, isLoading, error } = useEras();
  const [selectedEra, setSelectedEra] = useState<object | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModalHandler = (era: object) => {
    setSelectedEra(era);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEra(null);
    setIsModalOpen(false);
  };

  const handleUpdate = (era: { id: number }) => {
    navigate(`/EditarEras/${era.id}`);
  };

  const headers = ['ID', 'descripcion', 'Lote'];

  const handleRowClick = (era: object) => {
    openModalHandler(era);
  };

  const handleCreate = () => {
    navigate("/crear-eras");
  };

  const erasList = Array.isArray(eras) ? eras : [];

  const mappedEras = erasList.map((era) => ({
    id: era.id,
    descripcion: era.descripcion, // <- Aquí
    lote: era.fk_id_lote?.nombre_lote || 'Sin nombre de lote',
  }));
  

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text('Eras activas', 14, 10);

    const tableData = mappedEras.map((era) => [
      era.id,
      era.descripcion,
      era.lote,
    ]);

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 20,
    });

    doc.save('Eras.activas.pdf');
  };

  if (isLoading) return <div>Cargando eras...</div>;
  if (error instanceof Error) return <div>Error al cargar las eras: {error.message}</div>;

  return (
    <div className="overflow-x-auto rounded-lg">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={generarPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Reporte PDF
        </button>
      </div>

      <Tabla
        title="Eras"
        headers={headers}
        data={mappedEras}
        onClickAction={handleRowClick}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        createButtonTitle="Crear"
      />

      {selectedEra && (
        <VentanaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          titulo="Detalles de la Era"
          contenido={selectedEra}
        />
      )}
    </div>
  );
};

export default Eras;
