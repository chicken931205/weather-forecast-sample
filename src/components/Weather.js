import { useAppContext } from "../context/AppContext";

function Weather() {
  const { data, isInFarenheit } = useAppContext();

  return (
    <div className="border p-4 d-flex flex-column align-items-center">
      <img alt={data.current?.condition?.text} src={data.current?.condition?.icon} />
      <span className="display-5">
        <strong>
          {
            isInFarenheit
            ? `${ data.current?.temp_f ?? '-' } F`
            : `${ data.current?.temp_c ?? '-' } C`
          }
        </strong>
      </span>
      <span className="display-6" style={{ textTransform: 'capitalize' }}>{ data.location?.name }</span>
    </div>
  )
}

export default Weather;
