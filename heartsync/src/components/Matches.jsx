import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { INITIAL_PROFILES } from '../constants';
import { getScopedData, setScopedData } from '../utils/storage';

const Matches = () => {
    const [blockedUsers, setBlockedUsers] = useState(() => getScopedData('blockedUsers', []));

    const matches = INITIAL_PROFILES.filter(p => !blockedUsers.includes(p.id.toString()));


    const handleBlock = (id, name) => {
        const newBlocked = [...blockedUsers, id.toString()];
        setBlockedUsers(newBlocked);
        setScopedData('blockedUsers', newBlocked);

        const reports = getScopedData('reports', []);
        reports.push({ id: Date.now(), user: name, userId: id, reason: 'Reported from matches', status: 'pending' });
        setScopedData('reports', reports);
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Matches</h2>
            {matches.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p>No matches yet. Keep swiping!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {matches.map(match => (
                        <div key={match.id} className="relative group">
                            <Link to={`/chat/${match.id}`} className="block">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                                    <img
                                        src={match.photo}
                                        alt={match.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                                <div className="absolute bottom-2 left-2 text-white font-semibold drop-shadow-md">
                                    {match.name}
                                </div>
                            </Link>
                            <button
                                onClick={() => handleBlock(match.id, match.name)}
                                className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition hover:bg-red-500"
                                title="Block User"
                            >
                                <AlertTriangle className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Matches;