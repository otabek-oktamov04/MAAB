import { useParams } from "react-router-dom";
import StationForm from "./station-form";
import { useStation } from "../../contexts";

export const StationEdit = () => {
  const { stationId } = useParams();
  const { stations } = useStation();

  const station = stations?.results?.find((sta) => sta.id === stationId);

  return <StationForm initialValue={station} />;
};

export default StationEdit;
