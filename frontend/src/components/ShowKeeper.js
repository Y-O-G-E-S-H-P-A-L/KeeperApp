import React from "react";
import "../css/style.css";
import axios from "axios";

const ShowKeeper = ({ keeperList, setKeeperList }) => {
  const deleteKeeper = (id) => {
    axios.post("http://localhost:3001/api/delete", { id }).then((res) => setKeeperList(res.data));
  };
  return (
    <div className="showKeeper row">
      {keeperList.map((keeper) => (
        <div key={keeper._id} className="keeperCard col-md-3">
          <h1 className="title">
            {keeper.title}
            <i
              className="deleteIcon fa-solid fa-trash"
              onClick={() => {
                deleteKeeper(keeper._id);
              }}
            ></i>
          </h1>
          <textarea className="descriptionBox" value={keeper.description} readOnly>
            {keeper.description}
          </textarea>
        </div>
      ))}
    </div>
  );
};
export default ShowKeeper;
