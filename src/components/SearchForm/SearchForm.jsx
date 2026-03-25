import { useState } from 'react';
import styles from './SearchForm.module.css';

function SearchForm({ onSearch }) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim()) {
      onSearch(address);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Введите адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Поиск
      </button>
    </form>
  );
}

export default SearchForm;