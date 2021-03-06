import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../lib/API"
import AuthContext from '../../contexts/AuthContext'

const customStyles = {
    main:{
        'font-family': 'Arial, Helvetica, sans-serif'
    }
  };

const Income = (props) => {
  const { authToken } = useContext(AuthContext);
  const [income, setIncome] = useState(0);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const close = (event) => {
    event.preventDefault();
    props.close();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    API.Income.post(authToken, {
      date: date,
      category: category,
      amount: income,
      comment: comment,
    })
    .then(()=>{
      props.getLatestIncome();
      window.location.reload();
      console.log({
        date: date,
        category: category,
        amount: income,
        comment: comment
      });
    props.close()
  })
};

  return (
    <>
      <form style={customStyles.main}>
        <div className="form-group">
          <div className="mb-2">
          <label htmlFor="categoryBox">Income Date:</label>
            <div>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
          </div>

          <label htmlFor="categoryBox">Type of Income:</label>
          <input
            type="text"
            className="form-control"
            id="categoryBox"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="incomeBox">Income Amount:</label>
          <input
            type="text"
            className="form-control"
            id="incomeBox"
            value={income}
            onChange={(event) => setIncome(event.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="categoryBox">Notes:</label>
          <textarea
            id="commentBox"
            rows="4"
            cols="50"
            className="form-control"
            style={{ resize: "none" }}
            value ={comment}
            onChange={event=>setComment(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
          className="mt-3"
        >
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            Submit
          </button>
          <button className="btn btn-danger" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Income;
