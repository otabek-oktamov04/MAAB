import { Card, Text } from "@chakra-ui/react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IStation } from "../../shared/interfaces";

interface IProps {
  setValue: UseFormSetValue<IStation>;
  initialValue?: IStation;
}

export default function Map({ setValue, initialValue }: IProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFipYLNP3PQ-L7mRCQbP8Xs_d4AmWmaSE",
    libraries: ["places"],
  });

  useEffect(() => {
    if (initialValue) {
      setSelected({
        lat: Number(initialValue.latitude),
        lng: Number(initialValue.longitude),
      });
    }
  }, [initialValue]);

  const [selected, setSelected] = useState({
    lat: 0,
    lng: 0,
  });
  const center = useMemo(
    () => ({
      lat: Number(initialValue?.latitude) || 41.31095282242082,
      lng: Number(initialValue?.longitude) || 69.27978515625,
    }),
    [initialValue]
  );
  const handleClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat && lng) {
      setSelected({
        lat: lat,
        lng: lng,
      });
      setValue("latitude", +lat.toFixed(6));
      setValue("longitude", +lng.toFixed(6));
    }
  };

  if (!isLoaded) return <Text>xarita yuklanmoqda</Text>;

  return (
    <Card borderRadius="md" overflow="hidden" mt="6">
      <GoogleMap
        onClick={handleClick}
        zoom={15}
        center={center}
        mapContainerStyle={{
          width: "100%",
          height: "400px",
          display: "block",
        }}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </Card>
  );
}
