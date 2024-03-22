import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const MapDistance = ({ data }) => {
  return (
    <MapView
      initialRegion={{
        latitude: data?.order?.customer_latitude || 47.918822,
        longitude: data?.order?.customer_longitude || 106.917614,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      style={{ flex: 1 }}
      mapType="standard">
      <Marker
        coordinate={{
          latitude: data?.order?.customer_latitude || 0,
          longitude: data?.order?.customer_longitude || 0
        }}
        title={"Өвчтөн"}
        description={"тайлбар"}
        pinColor="rgba(251, 146, 60)"
      />
      <Marker
        coordinate={{
          latitude: data?.order?.driver?.latitude || 0,
          longitude: data?.order?.driver?.longitude || 0
        }}
        title={"Жолооч"}
        description={"Тайлбар"}
        pinColor="rgba(251, 146, 60)"
      />

      <MapViewDirections
        origin={{
          latitude: data?.order?.driver?.latitude || 0,
          longitude: data?.order?.driver?.longitude || 0
        }}
        destination={{
          latitude: data?.order?.customer_latitude || 0,
          longitude: data?.order?.customer_longitude || 0
        }}
        apikey="AIzaSyBQXuIC5PhnjyLdloilWKEH-QsNB-3FhCs"
        strokeWidth={3}
        strokeColor="rgb(0,139,241)"
      />
    </MapView>
  );
};

export default MapDistance;
