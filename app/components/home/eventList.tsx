import { useState } from 'react';
import PorchfestCard from './porchfestcard';
import FIFAMontclairCard from './fifamontclaircard';

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  imageUrl?: string;
};

export default function EventList() {
  const [eventType, setEventType] = useState("upcoming");
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'var(--font-headline)' }}>
          Upcoming Events
        </h2>
        
        {/* Event Type Selector */}
        <div className="flex justify-center mb-10">
          <button 
            className={`px-6 py-2 mx-2 rounded-full ${eventType === "upcoming" ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => setEventType("upcoming")}
          >
            Upcoming
          </button>
          <button 
            className={`px-6 py-2 mx-2 rounded-full ${eventType === "featured" ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => setEventType("featured")}
          >
            Featured
          </button>
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PorchfestCard */}
          <PorchfestCard />

          <FIFAMontclairCard />
        </div>
      </div>
    </section>
  );
}