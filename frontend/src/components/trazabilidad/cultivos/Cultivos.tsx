import { useState } from "react";
import { useCultivo } from "../../../hooks/trazabilidad/cultivo/useCultivo";
import VentanaModal from "../../globales/VentanasModales";
import Tabla from "../../globales/Tabla";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const Cultivos = () => {
  const { data: cultivos, isLoading, error } = useCultivo();
  const [selectedCultivo, setSelectedCultivo] = useState<object | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModalHandler = (cultivo: object) => {
    setSelectedCultivo(cultivo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCultivo(null);
    setIsModalOpen(false);
  };

  const handleRowClick = (cultivo: { id: number }) => {
    openModalHandler(cultivo);
  };

  const handleUpdate = (cultivo: { id: number }) => {
    navigate(`/actualizarcultivo/${cultivo.id}`);
  };
  
  const handleCreate = () => {
    navigate("/crearcultivo");
  };

  if (isLoading) return <div>Cargando cultivos...</div>;
  if (error instanceof Error)
    return <div>Error al cargar los cultivos: {error.message}</div>;

  const cultivosList = Array.isArray(cultivos) ? cultivos : [];

  const mappedCultivos = cultivosList.map((cultivo) => ({
    id: cultivo.id_cultivo,
    nombre: cultivo.nombre_cultivo,
    fecha_plantacion: new Date(cultivo.fecha_plantacion).toLocaleDateString(),
    descripcion: cultivo.descripcion,
    especie: cultivo.fk_id_especie
      ? cultivo.fk_id_especie.nombre_comun
      : "Sin especie",
    semillero: cultivo.fk_id_semillero
      ? cultivo.fk_id_semillero.nombre_semillero
      : "Sin semillero",
  }));

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Cultivos Activos', 14, 15);
  
    const tableData = mappedCultivos.map((cultivo) => [
      cultivo.id,
      cultivo.nombre,
      cultivo.fecha_plantacion,
      cultivo.descripcion,
      cultivo.especie,
      cultivo.semillero,
    ]);
  
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [34, 197, 94] }, 
    });
  
    doc.save('cultivos-activos.pdf');
  };
  

  const headers = [
    "ID",
    "Nombre",
    "Fecha Plantacion",
    "Descripcion",
    "Especie",
    "Semillero",
  ];

  return (
    <div className="overflow-x-auto  shadow-md rounded-lg">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={generarPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Reporte PDF
        </button>
      </div>


      <Tabla
        title="Listar Cultivos"
        headers={[...headers]}
        data={mappedCultivos}
        onClickAction={handleRowClick}
        onUpdate={handleUpdate} 
        onCreate={handleCreate}
        createButtonTitle="Crear"
        
      />

      {selectedCultivo && (
        <VentanaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          titulo="Detalles del Cultivo"
          contenido={selectedCultivo}
        />
      )}
    </div>
  );
};

export default Cultivos;
