import React from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaBuilding, FaHome, FaMoneyBillWave, FaFileAlt, FaCalendarAlt, FaHashtag } from 'react-icons/fa';
import { MdMeetingRoom, MdElevator, MdLocalParking, MdSecurity, MdPool } from 'react-icons/md';
import { GiFamilyHouse, GiCommercialAirplane } from 'react-icons/gi';
import { IoIosRestaurant, IoIosBasketball } from 'react-icons/io';
import { BiStore } from 'react-icons/bi';
import { BsFillHouseDoorFill } from 'react-icons/bs';

const SingleProperty = () => {
    const { propertyId } = useParams();

    // Mock data with all the fields from your form
    const property = {
        id: propertyId,
        basicInfo: {
            city: "الإسماعيلية",
            government: "محافظة الإسماعيلية",
            district: "حي السلام",
            streetNo: "12",
            location: "شارع النخيل"
        },
        ownerDocs: {
            type: "صك عقار",
            releaseDate: "2022-05-15",
            documentNum: "DOC-456789",
            commissionRate: "5%",
            isTaxable: "نعم",
            commercialRecordNum: "CR-123456"
        },
        propertyDetails: {
            propertyType: "شقة",
            purpose: "سكني",
            propertyNumber: "APT-789",
            buildDate: "2018-03-10",
            totalFloors: 8,
            totalUnits: 24
        },
        sharedFacilities: {
            parking: true,
            elevators: true,
            secureEntrances: true,
            securityService: true,
            swimmingPool: true,
            kidsPlayground: true,
            groceryStore: true,
            compoundName: "مشروع النخيل السكني"
        },
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        ],
        price: "1,200,000 جنيه"
    };

    // Facility icons mapping
    const facilityIcons = {
        parking: <MdLocalParking className="text-blue-500" />,
        elevators: <MdElevator className="text-blue-500" />,
        secureEntrances: <MdSecurity className="text-blue-500" />,
        securityService: <MdSecurity className="text-blue-500" />,
        swimmingPool: <MdPool className="text-blue-500" />,
        kidsPlayground: <GiFamilyHouse className="text-blue-500" />,
        groceryStore: <BiStore className="text-blue-500" />,
        // Add more icons as needed
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50">
            {/* Property Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative h-64 md:h-96">
                    <img 
                        src={property.images[0]} 
                        alt="Property main" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            {property.propertyDetails.propertyType} في {property.basicInfo.district}
                        </h1>
                        <div className="flex items-center text-white mt-2">
                            <FaMapMarkerAlt className="mr-1" />
                            <span>{property.basicInfo.city}, {property.basicInfo.government}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Property Details */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">تفاصيل العقار</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <FaBuilding className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">نوع العقار</h3>
                                    <p className="font-medium">{property.propertyDetails.propertyType}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <GiCommercialAirplane className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">الغرض</h3>
                                    <p className="font-medium">{property.propertyDetails.purpose}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaHashtag className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">رقم العقار</h3>
                                    <p className="font-medium">{property.propertyDetails.propertyNumber}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">تاريخ البناء</h3>
                                    <p className="font-medium">{property.propertyDetails.buildDate}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <BsFillHouseDoorFill className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">عدد الطوابق</h3>
                                    <p className="font-medium">{property.propertyDetails.totalFloors}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <MdMeetingRoom className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">عدد الوحدات</h3>
                                    <p className="font-medium">{property.propertyDetails.totalUnits}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    {/* <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">الموقع</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">المدينة</h3>
                                    <p className="font-medium">{property.basicInfo.city}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">المحافظة</h3>
                                    <p className="font-medium">{property.basicInfo.government}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">الحي</h3>
                                    <p className="font-medium">{property.basicInfo.district}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">رقم الشارع</h3>
                                    <p className="font-medium">{property.basicInfo.streetNo}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="h-64 md:h-96 rounded-lg overflow-hidden">
                            <iframe
                                title="property-location"
                                src={`https://www.google.com/maps?q=${encodeURIComponent(property.basicInfo.location)}&output=embed`}
                                className="w-full h-full border-none"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div> */}

                    {/* Owner Documents */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">مستندات المالك</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <FaFileAlt className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">نوع المستند</h3>
                                    <p className="font-medium">{property.ownerDocs.type}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">تاريخ الإصدار</h3>
                                    <p className="font-medium">{property.ownerDocs.releaseDate}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaHashtag className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">رقم الوثيقة</h3>
                                    <p className="font-medium">{property.ownerDocs.documentNum}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaMoneyBillWave className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">نسبة العمولة</h3>
                                    <p className="font-medium">{property.ownerDocs.commissionRate}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaFileAlt className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">خاضع للضريبة</h3>
                                    <p className="font-medium">{property.ownerDocs.isTaxable}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <FaHashtag className="text-gray-500 mt-1 mr-2" />
                                <div>
                                    <h3 className="text-sm text-gray-500">رقم السجل التجاري</h3>
                                    <p className="font-medium">{property.ownerDocs.commercialRecordNum}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Price Box */}
                   

                    {/* Facilities */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">المرافق</h2>
                        <div className="space-y-3">
                            {Object.entries(property.sharedFacilities)
                                .filter(([key, value]) => value && key !== 'compoundName')
                                .map(([key]) => (
                                    <div key={key} className="flex items-center">
                                        {facilityIcons[key] || <FaHome className="text-blue-500" />}
                                        <span className="mr-2">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Compound Info */}
                    {property.sharedFacilities.compoundName && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">معلومات المجمع</h2>
                            <p className="font-medium">{property.sharedFacilities.compoundName}</p>
                        </div>
                    )}

                    {/* Gallery */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">معرض الصور</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {property.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Property ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProperty;