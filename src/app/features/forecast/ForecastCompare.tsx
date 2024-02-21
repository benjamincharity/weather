import { SingleForecast } from './SingleForecast';
import { useLocationQuery } from '@hooks/useLocationQuery';

const ForecastCompare = () => {
  const { location1, location2, setLocationForCompare } = useLocationQuery();

  return (
    <div className={'h-full'}>
      <SingleForecast
        isCompareRoute={true}
        compareLocation={location1}
        selectedLocation={location2}
        setSelectedLocation={setLocationForCompare}
      />
    </div>
  );
};

export default ForecastCompare;
