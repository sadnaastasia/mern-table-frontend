import './modal.css';
import { useEffect, useContext } from 'react';
import { TableContext } from '../../App';
import axios from '../../axios/axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Modal() {
  const {
    isEditing,
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
    saveButton,
  } = useContext(TableContext);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (
      company.length >= 1 &&
      vacancy.length >= 1 &&
      salary.length >= 1 &&
      status.length >= 1
    ) {
      saveButton.current = true;
    } else {
      saveButton.current = false;
    }
  }, [company, vacancy, salary, status]);

  useEffect(() => {
    if (id) {
      axios.get(`/${id}`).then(({ data }) => {
        setCompany(data.company);
        setVacancy(data.vacancy);
        setSalary(data.salary);
        setStatus(data.status);
        setNote(data.note);
      });
    }
  }, []);

  const onSubmitHandler = async () => {
    try {
      const fields = {
        company,
        vacancy,
        salary,
        status,
        note,
      };

      isEditing.current
        ? await axios.patch(`/${id}`, fields)
        : await axios.post('/', fields);

      isEditing.current = false;

      navigate('/');
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="containerModal">
      <div className="modal">
        <h1 className="modal_title">Enter the data</h1>
        <input
          className="modal_input"
          type="text"
          value={company}
          placeholder="Company"
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="modal_input"
          type="text"
          value={vacancy}
          placeholder="Vacancy"
          onChange={(e) => setVacancy(e.target.value)}
        />
        <input
          className="modal_input"
          type="text"
          value={salary}
          placeholder="Salary"
          onChange={(e) => setSalary(e.target.value)}
        />
        <input
          className="modal_input"
          type="text"
          value={status}
          placeholder="Status"
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          className="modal_input"
          type="text"
          value={note}
          placeholder="Notes"
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          className="button modal_saveButton"
          disabled={!saveButton.current}
          onClick={() => {
            onSubmitHandler();
            setCompany('');
            setVacancy('');
            setSalary('');
            setStatus('');
            setNote('');
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
