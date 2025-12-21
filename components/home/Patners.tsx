import React from "react";

const partners = [
  {
    name: "COMPUTER SOCIETY OF INDIA",
    image: "https://picsum.photos/id/1011/200/200",
    type: "TECHNICAL PARTNER",
  },

];

const Patners = () => {
  return (
    <section className="py-16 bg-linear-to-b from-primary/10 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-primary">
          Our Partners
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-28 h-28 object-cover rounded-full border-4 border-primary shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-widest shadow-md uppercase">
                  {partner.type}
                </span>
              </div>
              <div className="mt-6 text-center">
                <span className="block text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patners;
