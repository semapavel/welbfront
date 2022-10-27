/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable import/namespace */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable spaced-comment */
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Pagination from "./components/Pagination";
import Select from "./components/Select";
import Input from "./components/Input";
import Button from "./components/Button";
import Table from "./components/Table";

function App() {
  const columns = ["Дата", "Название", "Количество", "Расстояние"];
  const signs = ["Равно", "Содержит", "Больше", "Меньше"];

  const [selectName, setSelectName] = useState("Выберите значение"); // Состояние селекта с названием
  const [selectSign, setSelectSign] = useState("Выберите значение"); // Состояние селекта со значением
  const [valueFilter, setValueFilter] = useState(""); // Состояние input
  const [searchOnTable, setSearchOnTable] = useState(false); // Состояние, чобы поиск начинался толко понажатию кнопки "Поиск"
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [travelsPerPage] = useState(4); // Количество зописей на странице
  const [travels, setTravels] = useState([]); // Массив со всеми записями
  const [filterTravels, setFilterTravels] = useState([]); // Массив для фильтрации

  const lastTravelIndex = currentPage * travelsPerPage; // Вычисление записей для вывода
  const firstTravelIndex = lastTravelIndex - travelsPerPage; // Индекс первой записи на странице
  const currentTravel = travels.slice(firstTravelIndex, lastTravelIndex); // Выборка из массива записей для отображения
  const currentFilterTravels = filterTravels.slice(
    firstTravelIndex,
    lastTravelIndex
  ); // Выборка из массива записей для отображения после фильтрации

  // Получение данных с сервера
  const getTravel = async () => {
    const response = await axios.get("https://welbex-serv.herokuapp.com/");
    setTravels(response.data);
  };
  useEffect(() => {
    getTravel();
  }, []);

  // Фильтрация
  function filterColumn() {
    setSearchOnTable(false);
    setCurrentPage(1);
    if (selectName === "Название") {
      if (selectSign === "Содержит") {
        setFilterTravels(
          travels.filter((elem) =>
            elem.name.toLowerCase().includes(valueFilter.toLowerCase())
          )
        );
      } else if (selectSign === "Равно") {
        setFilterTravels(
          travels.filter(
            (elem) => elem.name.toLowerCase() === valueFilter.toLowerCase()
          )
        );
      } else if (selectSign === "Больше") {
        setFilterTravels(
          travels.filter(
            (elem) => elem.name.toLowerCase() > valueFilter.toLowerCase()
          )
        );
      } else if (selectSign === "Меньше") {
        setFilterTravels(
          travels.filter(
            (elem) => elem.name.toLowerCase() < valueFilter.toLowerCase()
          )
        );
      }
    } else if (selectName === "Количество") {
      if (selectSign === "Содержит") {
        setFilterTravels(
          travels.filter((elem) => String(elem.quant).includes(valueFilter))
        );
      } else if (selectSign === "Равно") {
        setFilterTravels(
          travels.filter((elem) => elem.quant === Number(valueFilter))
        );
      } else if (selectSign === "Больше") {
        setFilterTravels(
          travels.filter((elem) => elem.quant > Number(valueFilter))
        );
      } else if (selectSign === "Меньше") {
        setFilterTravels(
          travels.filter((elem) => elem.quant < Number(valueFilter))
        );
      }
    } else if (selectName === "Расстояние") {
      if (selectSign === "Содержит") {
        setFilterTravels(
          travels.filter((elem) => String(elem.dist).includes(valueFilter))
        );
      } else if (selectSign === "Равно") {
        setFilterTravels(
          travels.filter((elem) => elem.dist === Number(valueFilter))
        );
      } else if (selectSign === "Больше") {
        setFilterTravels(
          travels.filter((elem) => elem.dist > Number(valueFilter))
        );
      } else if (selectSign === "Меньше") {
        setFilterTravels(
          travels.filter((elem) => elem.dist < Number(valueFilter))
        );
      }
    }
    setSearchOnTable(true);
  }
  // Удаление фильтров
  function deleteFilter() {
    setValueFilter("");
    setSearchOnTable(false);
  }

  //Рендеринг компонентов
  return (
    <div className="container">
      <Select
        selectValue={selectName}
        setSelectValue={setSelectName}
        arr={columns.slice(1)}
      />
      <Select
        selectValue={selectSign}
        setSelectValue={setSelectSign}
        arr={signs}
      />
      <Input valueFilter={valueFilter} setValueFilter={setValueFilter} />
      <Button onClickButton={filterColumn} btnName="Поиск" />
      <Button onClickButton={deleteFilter} btnName="Сбросить фильтр" />
      <Table
        columns={columns}
        currentTravel={
          searchOnTable && valueFilter ? currentFilterTravels : currentTravel
        }
      />
      <Pagination
        travelsPerPage={travelsPerPage}
        totalTravels={
          searchOnTable && valueFilter ? filterTravels.length : travels.length
        }
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
