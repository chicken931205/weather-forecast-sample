import Search from '../components/Search';
import WeatherForecast from '../components/WeatherForecast';

function Home() {
  return (
    <div className="row mx-0">
      <Search className="col-12 col-md-6 p-4" />
      <WeatherForecast className="col-12 col-md-6 p-4" />
    </div>
  )
}

export default Home;
