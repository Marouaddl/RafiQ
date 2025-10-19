import React from 'react';
import { FiUser } from 'react-icons/fi';

const Psychiatrists = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-2">Professionnels de Santé</h1>
      <p className="text-gray-600 text-sm mb-6">
        Trouvez et consultez des psychiatres et thérapeutes qualifiés.
      </p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Dr. Sophie Martin', specialty: 'Psychiatrie Générale', rating: '4.9', available: true },
            { name: 'Dr. Pierre Dubois', specialty: 'Thérapie Cognitive', rating: '4.8', available: false },
            { name: 'Dr. Marie Lambert', specialty: 'Stress et Anxiété', rating: '4.7', available: true }
          ].map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <FiUser className="text-blue-600 text-lg" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{doctor.name}</h3>
                <p className="text-xs text-gray-600">{doctor.specialty}</p>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-yellow-500">⭐ {doctor.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${doctor.available ? 'text-green-600' : 'text-gray-500'}`}>
                  {doctor.available ? 'Disponible' : 'Indisponible'}
                </span>
                <button className="bg-[#30A196] text-white text-xs px-3 py-1 rounded-lg hover:bg-[#00796B] transition-colors">
                  Consulter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Psychiatrists;