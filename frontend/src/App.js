import "./App.css";
import Header from "./components/Header";
import AddKeeper from "./components/AddKeeper";
import ShowKeeper from "./components/ShowKeeper";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [keeperList, setKeeperList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/getAll").then((res) => setKeeperList(res.data));
  }, []);
  return (
    <div className="App">
      {/* {console.log("keeperList:", keeperList)} */}
      <Header />
      <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
      <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
    </div>
  );
};

export default App;
