import { useState } from 'react';
import { useSensores } from '../../../hooks/iot/sensores/useSensores';
import Tabla from '../../globales/Tabla';
import VentanaModal from '../../globales/VentanasModales';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  LineChart,
  AreaChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const Sensores = () => {
  const { data: sensores, isLoading, error } = useSensores();
  const [selectedSensor, setSelectedSensor] = useState<object | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSensorIndex, setCurrentSensorIndex] = useState(0);
  const navigate = useNavigate();

  const openModalHandler = (sensor: object) => {
    setSelectedSensor(sensor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSensor(null);
    setIsModalOpen(false);
  };

  const handleUpdate = (sensor: { id: number }) => {
    navigate(`/editar-sensor/${sensor.id}`);
  };

  const handleCreate = () => {
    navigate('/crear-sensor');
  };

  const headers = ['ID', 'Nombre', 'Tipo', 'Unidad', 'descripcion', 'minimo', 'maximo'];

  if (isLoading) return <div className="text-center">Cargando sensores...</div>;
  if (error instanceof Error)
    return <div className="text-red-500">Error al cargar sensores: {error.message}</div>;

  const sensoresList = Array.isArray(sensores) ? sensores : [];

  const mappedSensores = sensoresList.map((sensor) => ({
    id: sensor.id_sensor,
    nombre: sensor.nombre_sensor,
    tipo: sensor.tipo_sensor,
    unidad: sensor.unidad_medida,
    descripcion: sensor.descripcion,
    minimo: sensor.medida_minima,
    maximo: sensor.medida_maxima,
  }));

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text('Sensores activos', 14, 10);
    const tableData = mappedSensores.map((sensor) => [
      sensor.id,
      sensor.nombre,
      sensor.tipo,
      sensor.unidad,
      sensor.descripcion,
      sensor.minimo,
      sensor.maximo,
    ]);
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 20,
    });
    doc.save('Sensores.activos.pdf');
  };

  const handleRowClick = (sensor: object) => {
    openModalHandler(sensor);
  };

  const simulateSensorData = (min: number, max: number) => {
    return Array.from({ length: 10 }, (_, i) => ({
      tiempo: `T${i + 1}`,
      valor: Math.floor(Math.random() * (max - min + 1)) + min,
    }));
  };

  const currentSensor = sensoresList[currentSensorIndex];
  const simulatedData = currentSensor
    ? simulateSensorData(currentSensor.medida_minima, currentSensor.medida_maxima)
    : [];

  const nextSensor = () => {
    setCurrentSensorIndex((prev) => (prev + 1) % sensoresList.length);
  };

  const prevSensor = () => {
    setCurrentSensorIndex((prev) => (prev - 1 + sensoresList.length) % sensoresList.length);
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sensores</h2>
        <button
          onClick={generarPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Reporte PDF
        </button>
      </div>

      {/* 📊 Carrusel de gráficos */}
      <div className="bg-white p-4 rounded shadow-md mb-6 border-2 border-green-500 max-w-md mx-auto">
        <h3 className="text-green-700 font-semibold text-lg mb-3 text-center">
          Mediciones simuladas por sensor
        </h3>

        {currentSensor && (
          <div className="text-center mb-2">
            <h4 className="text-md font-bold">{currentSensor.nombre_sensor}</h4>
            <p className="text-gray-500 text-xs">
              {currentSensor.tipo_sensor} — {currentSensor.unidad_medida}
            </p>
          </div>
        )}

        <div className="w-full h-[200px] mb-2">
          <ResponsiveContainer width="100%" height="100%">
            {currentSensorIndex % 2 === 0 ? (
              <LineChart data={simulatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tiempo" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            ) : (
              <AreaChart data={simulatedData}>
                <defs>
                  <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tiempo" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorArea)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={prevSensor}
            className="text-green-700 text-xl px-2 hover:text-green-900"
            title="Anterior"
          >
            ←
          </button>
          <button
            onClick={nextSensor}
            className="text-green-700 text-xl px-2 hover:text-green-900"
            title="Siguiente"
          >
            →
          </button>
        </div>
      </div>

      <Tabla
        title="Sensores"
        headers={headers}
        data={mappedSensores}
        onClickAction={handleRowClick}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        createButtonTitle="Crear"
      />

      {selectedSensor && (
        <VentanaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          titulo="Detalles del Sensor"
          contenido={selectedSensor}
        />
      )}
    </div>
  );
};

export default Sensores;
