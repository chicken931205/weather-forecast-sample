import { useAppContext } from "../context/AppContext";

function Forecast() {
  const { isInFarenheit, data } = useAppContext();
  return (
    <div className="d-flex justify-content-around">
      {
        data.forecast?.forecastday?.map(item => (
          <div key={item.date} className="d-flex flex-column align-items-center">
            { item.date }
            <img alt={item.day.condition.text} src={item.day.condition.icon} />
            <div className="d-flex justify-content-around">
              <strong>
                {
                  isInFarenheit
                  ? item.day?.maxtemp_f
                  : item.day?.maxtemp_c
                }
                °
              </strong>
              <span>
                {
                  isInFarenheit
                  ? item.day?.mintemp_f
                  : item.day?.mintemp_c
                }
                °
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Forecast;
