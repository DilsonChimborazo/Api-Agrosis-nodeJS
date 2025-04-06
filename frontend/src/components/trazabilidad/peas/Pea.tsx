import { useState } from 'react';
import { usePea } from '../../../hooks/trazabilidad/pea/usePea';
import VentanaModal from '../../globales/VentanasModales';
import Tabla from '../../globales/Tabla';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Pea = () => {
  const { data: peas, isLoading, error } = usePea();
  const [selectedPea, setSelectedPea] = useState<object | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModalHandler = (pea: object) => {
    setSelectedPea(pea);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedPea(null);
    setIsModalOpen(false);
  };

  const handleRowClick = (pea: object) => {
    openModalHandler(pea);
  };

  const handleUpdate = (pea: { id: number }) => {
    navigate(`/pea/editar/${pea.id}`);
  };

  const handleCreate = () => {
    navigate("/crearpea");
  };

  if (isLoading) return <div>Cargando PEA...</div>;
  if (error instanceof Error) return <div>Error al cargar los PEA: {error.message}</div>;

  const peasList = Array.isArray(peas) ? peas : [];

  const mappedPeas = peasList.map(pea => ({
    id: pea.id_pea,                
    nombre: pea.nombre,        
    descripcion: pea.descripcion
  }));
  
    const generarPDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('PEA Registrada', 14, 15);
    
      const tableData = mappedPeas.map((peas) => [
        peas.id,
        peas.nombre,
        peas.descripcion,
        
      ]);
    
      autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 20,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [34, 197, 94] }, 
      });
    
      doc.save('Pea.Registradas.pdf');
    };
    

  const headers = ['ID', 'Nombre', 'Descripcion'];

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
        title="Lista de PEA"
        headers={headers}
        data={mappedPeas}
        onClickAction={handleRowClick}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        createButtonTitle="Crear"
      />

      {selectedPea && (
        <VentanaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          titulo="Detalles del PEA"
          contenido={selectedPea}
        />
      )}
    </div>
  );
};

export default Pea;
