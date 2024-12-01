import './App.css';
import Modal from './components/modal/modal';
import { createContext, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Table from './components/table /table';

export const TableContext = createContext();

function App() {
  const [company, setCompany] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  const saveButton = useRef(false);

  const isEditing = useRef(false);

  return (
    <TableContext.Provider
      value={{
        company,
        setCompany,
        vacancy,
        setVacancy,
        salary,
        setSalary,
        status,
        setStatus,
        note,
        setNote,
        isEditing,
        saveButton,
      }}
    >
      <Routes>
        <Route path="/" element={<Table />}></Route>
        <Route path="/:id" element={<Modal />}></Route>
        <Route path="/create" element={<Modal />}></Route>
      </Routes>
    </TableContext.Provider>
  );
}

export default App;
