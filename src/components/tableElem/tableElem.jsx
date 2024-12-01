import './tableElem.css';
import { fetchRemoveInfo } from '../../store/slice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { TableContext } from '../../App';

export default function TableElem({
  id,
  company,
  vacancy,
  salary,
  status,
  note,
  button,
}) {
  const { isEditing } = useContext(TableContext);

  const dispatch = useDispatch();

  const deleteHandler = async () => {
    if (
      window.confirm(
        'Are you sure that you want to delete the response to this vacancy?'
      )
    )
      dispatch(fetchRemoveInfo(id));
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="row">
      <div className="cell">{company}</div>
      <div className="cell">{vacancy}</div>
      <div className="cell">{salary}</div>
      <div className="cell">{status}</div>
      <div className="cell">{note}</div>
      {button ? (
        <div className="cell cell_twoButtons">
          <Link to={`/${id}`}>
            <button
              className="button editButton"
              onClick={() => {
                isEditing.current = true;
              }}
            >
              Edit
            </button>
          </Link>

          <button
            className="button deleteButton"
            onClick={() => {
              deleteHandler();
              refreshPage();
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="cell"></div>
      )}
    </div>
  );
}
