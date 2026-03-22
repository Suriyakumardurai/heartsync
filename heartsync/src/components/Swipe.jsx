import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PROFILES } from '../constants';
import { getScopedData } from '../utils/storage';

const Swipe = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const profiles = getScopedData('allUsers', INITIAL_PROFILES);


    if (currentIndex >= profiles.length) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                    <Heart className="w-16 h-16 text-rose-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">No more people nearby!</h3>
                    <p className="text-gray-500 mt-2">Check back later for new matches.</p>
                    <button
                        onClick={() => setCurrentIndex(0)}
                        className="mt-6 text-rose-500 font-semibold hover:underline"
                    >
                        Start over
                    </button>
                </div>
            </div>
        );
    }

    const p = profiles[currentIndex];

    const handleSwipe = (dir) => {
        setDirection(dir);
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setDirection(null);
        }, 300);
    };

    return (
        <div className="max-w-md mx-auto p-4 flex flex-col items-center overflow-hidden">
            <div className="relative w-full aspect-[3/4]">
                <AnimatePresence>
                    <motion.div
                        key={p.id}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.x > 100) handleSwipe('right');
                            else if (info.offset.x < -100) handleSwipe('left');
                        }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{
                            x: direction === 'right' ? 500 : direction === 'left' ? -500 : 0,
                            opacity: 0,
                            rotate: direction === 'right' ? 20 : direction === 'left' ? -20 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                    >
                        <img
                            src={p.photo}
                            className="w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                            <h3 className="text-3xl font-bold">{p.name}, {p.age}</h3>
                            <p className="text-lg opacity-90 mt-1">{p.bio}</p>
                        </div>

                        {direction === 'right' && (
                            <div className="absolute top-10 left-10 border-4 border-green-500 text-green-500 font-black text-4xl px-4 py-2 rounded-xl rotate-[-20deg] uppercase">
                                Love
                            </div>
                        )}
                        {direction === 'left' && (
                            <div className="absolute top-10 right-10 border-4 border-red-500 text-red-500 font-black text-4xl px-4 py-2 rounded-xl rotate-[20deg] uppercase">
                                Nope
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-8 mt-10">
                <button
                    onClick={() => handleSwipe('left')}
                    className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition active:scale-95"
                >
                    <XIcon />
                </button>
                <button
                    onClick={() => handleSwipe('right')}
                    className="w-20 h-20 bg-rose-500 shadow-xl rounded-full flex items-center justify-center text-white hover:bg-rose-600 hover:scale-110 transition active:scale-95"
                >
                    <Heart className="w-8 h-8 fill-current" />
                </button>
            </div>
        </div>
    );
};

const XIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default Swipe;