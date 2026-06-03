import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

const createClusterCustomIcon = (cluster) => {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const markers = [
    { geocode: [24.7136, 46.6753], popUp: "Riyadh, Saudi Arabia" },
    { geocode: [21.4858, 39.1925], popUp: "Jeddah, Saudi Arabia" },
    { geocode: [21.3891, 39.8579], popUp: "Mecca, Saudi Arabia" },
    { geocode: [24.4709, 39.6122], popUp: "Medina, Saudi Arabia" },
    { geocode: [26.3927, 49.9777], popUp: "Dammam, Saudi Arabia" },
    { geocode: [26.2172, 50.1972], popUp: "Khobar, Saudi Arabia" },
    { geocode: [18.2465, 42.5117], popUp: "Abha, Saudi Arabia" },
    { geocode: [21.4373, 40.5127], popUp: "Taif, Saudi Arabia" },
    { geocode: [27.5114, 41.7208], popUp: "Hail, Saudi Arabia" },
    { geocode: [28.3839, 36.5662], popUp: "Tabuk, Saudi Arabia" },
    { geocode: [30.0444, 31.2357], popUp: "Cairo, Egypt" },
    { geocode: [31.2001, 29.9187], popUp: "Alexandria, Egypt" },
  ];

const initialPosition = [25.0, 38.0];
const initialZoom = 5;

const ResetViewButton = () => {
  const map = useMap();

  const resetView = () => {
    map.setView(initialPosition, initialZoom);
  };

  return (
    <button
      onClick={resetView}
      className="absolute top-4 left-4 bg-white text-gray-700 py-2 px-4 rounded-xl shadow-lg z-[1000] hover:bg-gray-50 transition-all duration-200 border border-gray-200 text-sm font-medium"
    >
      ← إعادة تعيين
    </button>
  );
};

const Map = () => {
  return (
    <div className="w-full p-6 mt-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">خريطة العقارات</h3>
        </div>
        <div className="relative">
          <MapContainer center={initialPosition} zoom={initialZoom} style={{ height: "55vh", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
              {markers.map((marker, index) => (
                <Marker position={marker.geocode} icon={customIcon} key={index}>
                  <Popup>{marker.popUp}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
            <ResetViewButton />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
