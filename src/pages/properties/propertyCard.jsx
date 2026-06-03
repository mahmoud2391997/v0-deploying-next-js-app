import React from "react";

const PropertyCard = ( {
    id,
    name,
    location,
    price,
    image
}) => {
    return (
        <div className="flex  flex-col bg-white rounded-lg shadow-md overflow-hidden max-w-3xl my-2 xl:h-[220px] mr-4">
            {/* Image Section */}
            <div className="w-full h-3/4 p-4">
                <img
                    src={ "https://altharwa.erpnextksa.com/files/cfb8124def0996251e63ee26664a97d4a40dd5ae-1-medium.jpeg"}
                    alt={name}
                    className="h-full w-full object-cover rounded-lg"
                />
            </div>

            {/* Details Section */}
            <div className="p-4 pt-0 flex flex-col justify-between">
                <p className="text-black font-bold text-lg">{name}</p>
                <p className="text-gray-400 text-md mb-4">{location}</p>
            </div>
        </div>
    );
};

export default PropertyCard;
