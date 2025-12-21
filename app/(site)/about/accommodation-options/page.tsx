import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AboutHeader from "@/components/common/AboutHeader";
import { MapPin, Star, ExternalLink } from "lucide-react"; // Optional icons
import { CONSTANTS } from "@/lib/constants";

const hotels = [
  {
    name: "Hotel Radisson Blu",
    location: "Greater Noida",
    image: "https://r1imghtlak.mmtcdn.com/a918a09c291e11e5b5850022195573b9.jfif",
    link: "https://www.ihg.com/intercontinental/hotels/gb/en/manama/bahha/hoteldetail",
    note: `Select <b>${CONSTANTS.COLLAGE_NAME}</b> as Rate Reference.`,
    rating: "4.5",
  },
  {
    name: "Hotel Ginger",
    location: "Greater Noida",
    image: "https://r2imghtlak.ibcdn.com/r2-mmt-htl-image/htl-imgs/202001082231075367-1c06e132496c11ea9ffc0242ac110003.jpg",
    link: "https://eur06.safelinks.protection.outlook.com/?url=http%3A%2F%2Froho.it%2Fbgmg&data=05%7C02%7Ccrbansolay%40utb.edu.bh%7Ccfa6045b6ccb425e426e08ddabdfcfc4%7Cc599d08d7ffd46c98e6ccc8b13dbba77%7C0%7C0%7C638855699924365403%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=qiBIKXnECK6lFPOIUs5Uap3y7%2BmHuA%2FUiRO1tn3Xm4Y%3D&reserved=0",
    note: `Select <b>${CONSTANTS.COLLAGE_NAME}</b> as Rate Reference.`,
    rating: "4.0",
  },
  {
    name: "Hotel Le Seasons",
    location: "Greater Noida",
    image: "https://cf.bstatic.com/xdata/images/hotel/square600/471016173.webp?k=068237c2898ed4513c0aa63f585408283f96efeef2f83e335af7260893344e5e&o=",
    link: "https://all.accor.com/hotel/6702/index.en.shtml",
    note: `Select <b>${CONSTANTS.COLLAGE_NAME}</b> as Rate Reference.`,

    rating: "4.2",
  },
  {
    name: "Udman Hotel",
    location: "Greater Noida",
    image: "https://cf.bstatic.com/xdata/images/hotel/square600/311346165.webp?k=80a9ccd691d491837af7a481f1f600ea1cddb123b36e0d73a57be132d8ac9f8a&o=",
    link: "http://www.westincitycentrebahrain.com/",
    note: `Select <b>${CONSTANTS.COLLAGE_NAME}</b> as Rate Reference.`,
    rating: "4.3",
  },
  {
    name: "Expo Inn",
    location: "Greater Noida",
    image: "https://lh3.googleusercontent.com/p/AF1QipP5F7YTbB8vK7W4E5DLZ86E0my6WeWuhv75NbB2=s680-w680-h510-rw",
    link: "http://www.lemeridienbahraincitycentre.com/",
    note: `Select <b>${CONSTANTS.COLLAGE_NAME}</b> as Rate Reference.`,
    rating: "3.8",
  },
];

export default function AccommodationOptionsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <AboutHeader
        title="Accommodation Options"
        date="November 6-7, 2025"
        // image="/images/simdte-white-lg.png"
        overlayColor="#1a1a2e"
        bgImage="/images/utb-images/gallery/gallery-2.jpg"
        dividerColor="primary"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Welcome to IC-AMESF 2025
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                We are pleased to offer accommodation options for delegates attending the{" "}
                <span className="font-semibold text-gray-900">
                  International Conference on Advanced Materials & Engineering for Sustainable Future (IC-AMESF 2025)
                </span>.
              </p>
              <p>
                To ensure a comfortable and convenient stay, IILM University, Greater Noida has partnered 
                with premium hotels located within close proximity to the conference venue.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Exclusive Rates</h3>
                  <p className="text-sm text-gray-600">Special pricing for conference participants</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Prime Location</h3>
                  <p className="text-sm text-gray-600">Walking distance or short drive to venue</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quality Options</h3>
                  <p className="text-sm text-gray-600">Budget to premium accommodation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Partner Hotels
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose from our carefully selected accommodation partners offering comfort and convenience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel, idx) => (
              <Card 
                key={idx} 
                className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 shadow-lg rounded-2xl"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-56 bg-gray-200">
                  <img
                    src={hotel.image}
                    alt={`${hotel.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                 
                </div>

                <CardContent className="p-6">
                  {/* Hotel Name and Location */}
                  <div className="mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {hotel.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>

                  {/* Note/Instructions */}
                  {hotel.note && (
                    <CardDescription
                      className="text-sm text-gray-700 leading-relaxed mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100"
                      dangerouslySetInnerHTML={{ __html: hotel.note }}
                    />
                  )}

                  {/* Button */}
                  <Button
                    // asChild
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <a
                      href={hotel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>View Booking Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Transportation Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-sm border border-indigo-100 p-8 md:p-10">
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Transportation Details
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  IILM University, Greater Noida is well connected to Delhi, Ghaziabad, Meerut, and Agra 
                  by highways. You can reach us by <span className="font-semibold">metro</span> (Knowledge Park 02 Metro Station, 
                  Aqua Line), <span className="font-semibold">bus</span>, <span className="font-semibold">cab</span>, or other public transport options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
