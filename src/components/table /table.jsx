import './table.css';
import { useEffect } from 'react';
import TableElem from '../tableElem/tableElem';
import { fetchInfo } from '../../store/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Table() {
  const dispatch = useDispatch();

  const info = useSelector((state) => state.info);

  const isInfoLoading = info.status === 'loading';

  useEffect(() => {
    dispatch(fetchInfo());
  }, []);

  return (
    <div className="containerTable">
      <div className="plusButtonDiv">
        <Link to="/create">
          <button className="button plusButton">+</button>
        </Link>
      </div>
      <div>
        <div className="table_title">
          <TableElem
            id="1"
            company="Company"
            vacancy="Vacancy"
            salary="Salary"
            status="Status"
            note="Note"
            button={false}
          />
        </div>

        <div className="table">
          {(isInfoLoading ? [...Array(5)] : info.items).map((obj) =>
            isInfoLoading ? (
              <TableElem />
            ) : (
              <TableElem
                id={obj._id}
                company={obj.company}
                vacancy={obj.vacancy}
                salary={obj.salary}
                status={obj.status}
                note={obj.note}
                button={true}
                isLoading={true}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
