import { useCallback } from "react";
import { useAppContext } from "../context/AppContext";

function Search({ className }) {
  const { city, setCity, isInFarenheit, setIsInFarenheit, isLoading, loadData } = useAppContext();

  const handleCityChange = useCallback(e => setCity(e.target.value), [setCity]);
  const handleTempUnitChange = useCallback(v => () => setIsInFarenheit(v), [setIsInFarenheit]);

  return (
    <div className={ className }>
      <div className="mb-4 p-4 border">
        <h2>Anytime Weather</h2>
        <div className="my-3">
          <label htmlFor="cityName" className="form-label">Enter city below</label>
          <input
            type="text"
            className="form-control"
            id="cityName"
            placeholder="Enter City Name"
            value={city}
            onChange={handleCityChange}
          />
        </div>
        <div className="d-flex">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="tempUnit"
              id="unitFaren"
              checked={isInFarenheit}
              onClick={handleTempUnitChange(true)}
              readOnly
            />
            <label className="form-check-label" htmlFor="unitFaren">
              F
            </label>
          </div>
          <div className="ms-2 form-check">
            <input
              className="form-check-input"
              type="radio"
              name="tempUnit"
              id="unitCelci"
              checked={!isInFarenheit}
              onClick={handleTempUnitChange(false)}
              readOnly
            />
            <label className="form-check-label" htmlFor="unitCelci">
              C
            </label>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={loadData}
        disabled={isLoading || !city}
      >
        {
          isLoading
          ? (
              <>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status"> Loading...</span>
              </>
            )
          : 'Enter'
        }
      </button>
    </div>
  )
}

export default Search;
