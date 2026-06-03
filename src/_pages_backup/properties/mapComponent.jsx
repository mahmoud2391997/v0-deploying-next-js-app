import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";

// Custom Icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png ",
  iconSize: [38, 38],
});

// Initial Position
const initialPosition = [25.0, 38.0];

const mockLocations = {
  "الرياض": [24.7136, 46.6753],
  "جدة": [21.4858, 39.1925],
  "مكة": [21.3891, 39.8579],
  "المدينة": [24.4709, 39.6122],
  "الدمام": [26.3927, 49.9777],
  "الخبر": [26.2172, 50.1972],
  "أبها": [18.2465, 42.5117],
  "الطائف": [21.4373, 40.5127],
  "حائل": [27.5114, 41.7208],
  "تبوك": [28.3839, 36.5662],
  "القاهرة": [30.0444, 31.2357],
  "الإسكندرية": [31.2001, 29.9187],
};

const geocodeAddress = async (address) => {
  await new Promise(r => setTimeout(r, 500));
  if (!address.trim()) return null;
  for (const [key, coords] of Object.entries(mockLocations)) {
    if (address.includes(key)) return coords;
  }
  return null;
};

// Location Marker
const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>
        الموقع المحدد: <br />
        العرض: {position[0].toFixed(5)}, الطول: {position[1].toFixed(5)}
      </Popup>
    </Marker>
  ) : null;
};

// Map Controller
const MapController = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position, map]);
  return null;
};

const ResetViewButton = ({ onReset }) => (
  <button
    onClick={onReset}
    className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded z-[1000]"
  >
    إعادة تعيين
  </button>
);

const MapPickerBase = ({ register }, ref) => {
  const [position, setPosition] = useState(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    searchAddress: async (address) => {
      const result = await geocodeAddress(address);
      if (result) {
        setPosition(result);
      } else {
        alert("لم يتم العثور على الموقع");
      }
    }
  }));

  // Register hidden inputs for lat/lng
  useEffect(() => {
    if (register) {
      register("location.latitude");
      register("location.longitude");
    }
  }, [register]);

  useEffect(() => {
    if (register && position) {
      const [lat, lng] = position;
      const latInput = document.querySelector("[name='location.latitude']");
      const lngInput = document.querySelector("[name='location.longitude']");
      if (latInput) latInput.value = lat.toFixed(6);
      if (lngInput) lngInput.value = lng.toFixed(6);
    }
  }, [position, register]);

  return (
    <div className="relative w-full h-[55vh]">
      <MapContainer center={position || initialPosition} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright ">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
        <MapController position={position} />
        <ResetViewButton onReset={() => setPosition(null)} />
      </MapContainer>

      {position && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow z-[1000]">
          <span>
            تم اختيار الموقع: العرض {position[0].toFixed(5)}، الطول {position[1].toFixed(5)}
          </span>
        </div>
      )}

      {/* Hidden Inputs */}
      {register && (
        <>
          <input type="hidden" {...register("location.latitude")} />
          <input type="hidden" {...register("location.longitude")} />
        </>
      )}
    </div>
  );
};

// Wrap with forwardRef
const MapPicker = forwardRef(MapPickerBase);

export default MapPicker;