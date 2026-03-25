import { useState } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import Map from './components/Map/Map';
import styles from './App.module.css';

function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const DADATA_API_KEY = '5632f5d923be9608de2a336025bcb18882315d4c';
  const DADATA_SECRET_KEY = '3651f7ffbabbeed9dd96dbcbdc5f86e2524f9069';

  const fetchAddress = async (address) => {
    setLoading(true);
    setError('');
    setCoordinates(null);

    try {
      console.log('Ищу адрес:', address);
      
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + DADATA_API_KEY,
          'X-Secret': DADATA_SECRET_KEY,
        },
        body: JSON.stringify({ 
          query: address,
          count: 1 
        }),
      });

      console.log('Статус ответа:', response.status);
      
      if (!response.ok) {
        throw new Error('HTTP ${response.status}');
      }
      
      const data = await response.json();
      console.log('Данные от DaData:', data);

      if (data.suggestions && data.suggestions.length > 0) {
        const suggestion = data.suggestions[0];
        const lat = suggestion.data.geo_lat;
        const lon = suggestion.data.geo_lon;
        
        console.log('Координаты:', lat, lon);

        if (lat && lon) {
          setCoordinates([parseFloat(lat), parseFloat(lon)]);
        } else {
          setError('У этого адреса нет координат');
        }
      } else {
        setError('Адрес не найден. Попробуйте ввести точнее');
      }
    } catch (err) {
      console.error('Ошибка:', err);
      setError('Ошибка при запросе: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <h1>Поиск адреса на карте</h1>
      <SearchForm onSearch={fetchAddress} />
      {loading && <p style={{textAlign: 'center', color: 'blue'}}>Загрузка...</p>}
      {error && <p style={{textAlign: 'center', color: 'red'}}>{error}</p>}
      <Map coordinates={coordinates} />
    </div>
  );
}

export default App;