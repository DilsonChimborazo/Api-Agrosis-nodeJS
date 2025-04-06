import { useState } from 'react';
import { useControlFitosanitario } from '../../../hooks/trazabilidad/control/useControlFitosanitario';
import VentanaModal from '../../globales/VentanasModales';
import Tabla from '../../globales/Tabla';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const ControlFitosanitario = () => {
  const { data: controles, isLoading, error } = useControlFitosanitario();
  const [selectedControl, setSelectedControl] = useState<null | object>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModalHandler = (control: object) => {
    setSelectedControl(control);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedControl(null);
    setIsModalOpen(false);
  };

  const handleRowClick = (control: object) => {
    openModalHandler(control);
  };

  const handleUpdate = (residuo: { id: number }) => {
    navigate(`/controlfitosanitario/editar/${residuo.id}`);
  };

  const handleCreate = () => {
    navigate("/crearcontrolfitosanitario");
  };

  if (isLoading) return <div>Cargando Controles Fitosanitarios...</div>;
  if (error instanceof Error) return <div>Error al cargar los controles: {error.message}</div>;

  const controlesList = Array.isArray(controles) ? controles : [];


  const mappedControles = controlesList.map(control => ({
    id: control.id_control_fitosanitario,
    fecha_control: new Date(control.fecha_control).toLocaleDateString(),
    descripcion: control.descripcion,
    cultivo: control.desarrollan?.cultivo?.nombre_cultivo || 'Sin cultivo',
    pea: control.desarrollan?.pea?.nombre || 'Sin PEA'
  }));

 const generarPDF = () => {
     const doc = new jsPDF();
     doc.setFontSize(16);
     doc.text('Controles Generados', 14, 15);
   
     const tableData = mappedControles.map((control) => [
      control.id,
      control.fecha_control,
      control.descripcion,
      control.descripcion,
      control.cultivo,
      control.pea,
     ]);
   
     autoTable(doc, {
       head: [headers],
       body: tableData,
       startY: 20,
       styles: { fontSize: 10 },
       headStyles: { fillColor: [34, 197, 94] }, 
     });
   
     doc.save('Controles.generados.pdf');
   };
   
  

  const headers = ['ID', 'Fecha Control', 'Descripcion', 'Cultivo', 'Pea'];

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
        title="Lista de Controles Fitosanitarios"
        headers={[...headers]}
        data={mappedControles}
        onClickAction={handleRowClick}
        onUpdate={handleUpdate} 
        onCreate={handleCreate}
        createButtonTitle="Crear"
      />

      {selectedControl && (
        <VentanaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          titulo="Detalles del Control Fitosanitario"
          contenido={selectedControl} 
        />
      )}
    </div>
  );
};

export default ControlFitosanitario;
