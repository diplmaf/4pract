}
<br> закрытие компонента App

export default App
<br> экспорт компонента

---

## src/components/SearchForm/SearchForm.jsx
компонент формы поиска адреса

import { useState } from 'react'
<br> импорт хука useState

import styles from './SearchForm.module.css'
<br> импорт CSS-модулей

---

function SearchForm({ onSearch }) {
<br> объявление компонента с пропсом onSearch

const [address, setAddress] = useState('')
<br> состояние для хранения введенного адреса

---

const handleSubmit = (e) => {
<br> обработчик отправки формы

e.preventDefault()
<br> предотвращение перезагрузки страницы

if (address.trim()) {
<br> проверка, что поле не пустое

onSearch(address)
<br> вызов функции поиска из родителя

}
<br> закрытие условия

}
<br> закрытие обработчика

---

return (
<br> возврат JSX-разметки

<form className={styles.form} onSubmit={handleSubmit}>
<br> форма с обработчиком отправки

<input
<br> поле ввода

type="text"
<br> тип текстовое поле

className={styles.input}
<br> стилизация через CSS-модули

placeholder="Введите адрес"
<br> текст-подсказка

value={address}
<br> привязка значения к состоянию

onChange={(e) => setAddress(e.target.value)}
<br> обновление состояния при вводе

/>
<br> закрытие input

<button type="submit" className={styles.button}>
<br> кнопка отправки формы

Поиск
<br> текст кнопки

</button>
<br> закрытие button

</form>
<br> закрытие form

);
<br> завершение return

}
<br> закрытие компонента

export default SearchForm
<br> экспорт компонента

---

## src/components/Map/Map.jsx
компонент отображения карты

import { useEffect, useRef } from 'react'
<br> импорт хуков useEffect и useRef

import L from 'leaflet'
<br> импорт библиотеки Leaflet

import 'leaflet/dist/leaflet.css'
<br> импорт стилей Leaflet

import styles from './Map.module.css'
<br> импорт CSS-модулей

---

function Map({ coordinates }) {
<br> объявление компонента с пропсом coordinates

const mapRef = useRef(null)
<br> ссылка на объект карты

const markerRef = useRef(null)
<br> ссылка на объект маркера

---

useEffect(() => {
<br> инициализация карты при монтировании

if (!mapRef.current) {
<br> проверка, что карта не создана

mapRef.current = L.map('map').setView([55.751244, 37.618423], 10)
<br> создание карты с центром на Москве

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
<br> добавление слоя карты OpenStreetMap

attribution: '© OpenStreetMap contributors'
<br> указание авторства

}).addTo(mapRef.current)
<br> добавление слоя на карту

}
<br> закрытие условия

return () => {
<br> очистка при размонтировании

if (mapRef.current) {
<br> проверка наличия карты

mapRef.current.remove()
<br> удаление карты

mapRef.current = null
<br> сброс ссылки

}
<br> закрытие условия

}
<br> закрытие return

}, [])
<br> пустой массив зависимостей (один раз при монтировании)

---

useEffect(() => {
<br> обновление маркера при изменении координат

if (!mapRef.current || !coordinates) return
<br> выход, если нет карты или координат

if (markerRef.current) {
<br> проверка наличия старого маркера

markerRef.current.remove()
<br> удаление старого маркера

}
<br> закрытие условия

markerRef.current = L.marker(coordinates).addTo(mapRef.current)
<br> создание и добавление нового маркера

mapRef.current.setView(coordinates, 14)
<br> перемещение карты к координатам

}, [coordinates])
<br> зависимость от координат

---

return <div id="map" className={styles.map}></div>
<br> возврат контейнера для карты

}
<br> закрытие компонента

export default Map
<br> экспорт компонента
