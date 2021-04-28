import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(({ isMarkerShown, lat, lng }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setShow(true);
      }, 2000);
    }, [lat, lng]);
    return (
      <GoogleMap defaultZoom={18} center={{ lat, lng }}>
        {isMarkerShown && show && (
          <Marker key={`${lat}-${lng}`} position={{ lat, lng }} />
        )}
      </GoogleMap>
    );
  })
);

export default MyMapComponent;
