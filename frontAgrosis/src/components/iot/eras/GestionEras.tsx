import React, { useState } from 'react';
import CrearEras from './CrearEras';
import Mapa from '@/components/trazabilidad/mapa/Mapa';

interface Era {
    id: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
    fk_id_lote: number;
    latitud: number;
    longitud: number;
}

const GestionEras: React.FC = () => {
    const [nuevaEra, setNuevaEra] = useState<Era | undefined>(undefined);

    const handleNewEra = (era: Era) => {
        setNuevaEra(era);
    };

    return (
        <div>
            <h1>Gestión de Eras</h1>
            <CrearEras onSuccess={handleNewEra} />
            <Mapa nuevaEra={nuevaEra} />
        </div>
    );
};

export default GestionEras;