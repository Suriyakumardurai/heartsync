import React, { useState } from 'react';
import { User, Settings, LogOut, Camera, Bell, Lock, Eye, ChevronRight } from 'lucide-react';

const ProfileSettings = () => {
    const [view, setView] = useState('main'); // 'main', 'edit', 'settings'
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const [formData, setFormData] = useState({
        name: user.email?.split('@')[0] || 'User',
        bio: 'Coffee lover and travel enthusiast.',
        location: 'New York',
    });

    const logout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = '/';
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        setView('main');
    };

    if (view === 'edit') {
        return (
            <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => setView('main')} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronRight className="rotate-180" />
                    </button>
                    <h2 className="text-2xl font-bold">Edit Profile</h2>
                </div>

                <div className="relative w-32 h-32 mx-auto mb-8">
                    <img src="/Photos/photo1.png" className="w-full h-full rounded-full object-cover border-4 border-rose-500" />
                    <button className="absolute bottom-0 right-0 bg-rose-500 text-white p-2 rounded-full shadow-lg">
                        <Camera className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
                        <textarea
                            rows="3"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-rose-500 text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition shadow-lg">
                        Save Changes
                    </button>
                </form>
            </div>
        );
    }

    if (view === 'settings') {
        return (
            <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => setView('main')} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronRight className="rotate-180" />
                    </button>
                    <h2 className="text-2xl font-bold">Settings</h2>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Bell className="text-rose-500" />
                            <span className="font-medium">Notifications</span>
                        </div>
                        <div className="w-12 h-6 bg-rose-500 rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Lock className="text-rose-500" />
                            <span className="font-medium">Privacy</span>
                        </div>
                        <ChevronRight className="text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Eye className="text-rose-500" />
                            <span className="font-medium">Discovery Settings</span>
                        </div>
                        <ChevronRight className="text-gray-400" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-rose-500 shadow-lg">
                    <img src="/Photos/photo1.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h2 className="text-2xl font-bold">{formData.name}</h2>
                <p className="text-gray-500">{formData.location}</p>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => setView('edit')}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border hover:bg-gray-50 transition"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-rose-50 rounded-lg text-rose-500"><User /></div>
                        <span className="font-semibold">Edit Profile</span>
                    </div>
                    <ChevronRight className="text-gray-400" />
                </button>
                <button
                    onClick={() => setView('settings')}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border hover:bg-gray-50 transition"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Settings /></div>
                        <span className="font-semibold">Settings</span>
                    </div>
                    <ChevronRight className="text-gray-400" />
                </button>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 p-4 bg-red-50 text-red-600 rounded-2xl shadow-sm border border-red-100 hover:bg-red-100 transition mt-8"
                >
                    <LogOut />
                    <span className="font-bold">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;