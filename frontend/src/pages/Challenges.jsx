import React from 'react';

const Challenges = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-2">Défis Quotidiens</h1>
      <p className="text-gray-600 text-sm mb-6">
        Participez à des défis pour améliorer votre bien-être mental.
      </p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Méditation 7 jours', progress: 75, description: 'Méditez 10 min par jour pendant 7 jours' },
            { title: 'Exercice Respiration', progress: 40, description: 'Pratiquez la respiration profonde' },
            { title: 'Journal de Gratitude', progress: 100, description: 'Notez 3 choses positives par jour' },
            { title: 'Déconnexion Digitale', progress: 25, description: '1h sans écran avant le coucher' }
          ].map((challenge, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{challenge.title}</h3>
              <p className="text-xs text-gray-600 mb-3">{challenge.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-[#30A196] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{challenge.progress}% complété</span>
                <button className="text-[#30A196] text-xs font-medium hover:text-[#00796B] transition-colors">
                  Continuer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;