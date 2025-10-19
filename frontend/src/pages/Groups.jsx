import React from 'react';

const Groups = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-2">Groupes de Soutien</h1>
      <p className="text-gray-600 text-sm mb-6">
        Rejoignez des communautés partageant les mêmes défis et objectifs.
      </p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Gestion du Stress', members: '245 membres', active: true },
            { name: 'Méditation Guidée', members: '189 membres', active: false },
            { name: 'Développement Personnel', members: '312 membres', active: true },
            { name: 'Soutien Anxiété', members: '156 membres', active: true }
          ].map((group, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{group.name}</h3>
                {group.active && (
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">En ligne</span>
                )}
              </div>
              <p className="text-xs text-gray-600 mb-3">{group.members}</p>
              <button className="w-full bg-[#30A196] text-white text-xs py-2 rounded-lg hover:bg-[#00796B] transition-colors">
                Rejoindre
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;