import Weather from './Weather';
import Forecast from './Forecast';
import { useAppContext } from '../context/AppContext';
import { useCallback, useEffect, useState } from 'react';

function WeatherForecast({ className }) {
  const { data, saveFavorite } = useAppContext();
  const [isFav, setIsFav] = useState(false);
  
  useEffect(() => {
    setIsFav(false);
  }, [data]);

  const handleChange = useCallback(() => {
    saveFavorite(!isFav);
    setIsFav(!isFav);
  }, [isFav, setIsFav, saveFavorite]);

  return data
    ? (
        <div className={className}>
          <Weather />
          <div className="form-check my-4 d-flex justify-content-center">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="checkFav"
              checked={isFav}
              onChange={handleChange}
            />
            <label className="form-check-label ms-2" htmlFor="checkFav">
              Save as Favorite
            </label>
          </div>
          <Forecast />
        </div>
      )
    : null;
}

export default WeatherForecast;
