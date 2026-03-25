# Поиск адреса на карте (React + DaData API)

---

## src/main.jsx
объявление точки входа приложения

import React from 'react'
<br> импорт библиотеки React

import ReactDOM from 'react-dom/client'
<br> импорт ReactDOM для рендеринга

import App from './App'
<br> импорт главного компонента App

import 'leaflet/dist/leaflet.css'
<br> импорт стилей библиотеки Leaflet для карты

import './index.css'
<br> импорт глобальных стилей

---

ReactDOM.createRoot(document.getElementById('root')).render(
<br> рендеринг приложения в DOM-элемент с id="root"

<React.StrictMode>
<br> включение строгого режима React

<App />
<br> отображение главного компонента

</React.StrictMode>
<br> закрытие строгого режима

);
<br> завершение рендеринга

---

## src/App.jsx
главный компонент приложения

import { useState } from 'react'
<br> импорт хука useState для управления состоянием

import SearchForm from './components/SearchForm/SearchForm'
<br> импорт компонента формы поиска

import Map from './components/Map/Map'
<br> импорт компонента карты

import styles from './App.module.css'
<br> импорт CSS-модулей для стилизации

---

function App() {
<br> объявление функционального компонента App

const [coordinates, setCoordinates] = useState(null)
<br> состояние для хранения координат [широта, долгота]

const [error, setError] = useState('')
<br> состояние для хранения текста ошибки

const [loading, setLoading] = useState(false)
<br> состояние для индикации загрузки

---

const DADATA_API_KEY = 'ваш_api_ключ'
<br> API-ключ DaData (получить на dadata.ru)

const DADATA_SECRET_KEY = 'ваш_секретный_ключ'
<br> секретный ключ DaData

---

const fetchAddress = async (address) => {
<br> асинхронная функция для поиска адреса

setLoading(true)
<br> включение индикатора загрузки

setError('')
<br> сброс предыдущей ошибки

setCoordinates(null)
<br> сброс предыдущих координат

---

try {
<br> начало блока обработки запроса

const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
<br> отправка POST-запроса к API DaData

method: 'POST',
<br> метод запроса

headers: {
<br> заголовки запроса

'Content-Type': 'application/json',
<br> тип содержимого JSON

**'Authorization': Token ${DADATA_API_KEY},**
<br> авторизация с API-ключ'X-Secret': DADATA_SECRET_KEYEY**
<br> секретный кл},},**
<br> закрытие заголовкbody: JSON.stringify({ query: address, count: 1 })})**
<br> тело запроса с адресом для поис})})**
<br> закрытие fetch

-const data = await response.json()()**
<br> преобразование ответа в JSif (data.suggestions && data.suggestions.length > 0) { {**
<br> проверка наличия результатconst suggestion = data.suggestions[0]0]**
<br> получение первого результаconst lat = suggestion.data.geo_latat**
<br> получение широconst lon = suggestion.data.geo_lonon**
<br> получение долгоsetCoordinates([parseFloat(lat), parseFloat(lon)])])**
<br> сохранение координ} else { {**
<br> если адрес не найдsetError('Адрес не найден. Попробуйте уточнить запрос.')')**
<br> вывод сообщения об ошиб}*}**
<br> закрытие услов} catch (err) { {**
<br> обработка ошибsetError('Ошибка сети или сервера')')**
<br> вывод сообщения об ошиб} finally { {**
<br> блок, выполняемый в любом случsetLoading(false)e)**
<br> выключение индикатора загруз}*}**
<br> закрытие final}*}**
<br> закрытие функции fetchAddress

-return ( (**
<br> возврат JSX-размет<div className={styles.app}>}>**
<br> контейнер приложен<h1>Поиск адреса на карте</h1>1>**
<br> заголовок страни<SearchForm onSearch={fetchAddress} />/>**
<br> форма поиска с передачей функции-обработчи{loading && <p>Загрузка...</p>}>}**
<br> индикатор загруз{error && <p className={styles.error}>{error}</p>}>}**
<br> вывод ошиб<Map coordinates={coordinates} />/>**
<br> компонент карты с передачей координ</div>v>**
<br> закрытие контейне););**
<br> завершение return

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
