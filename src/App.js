import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./component/Navigation";
import Poll from "./component/Poll";
import Add_poll from "./component/Add_poll";
import Member from "./component/Member";
import Add_Member from "./component/Add_Member";
import Signup from "./component/Signup";
import Login from "./component/Login";

function App() {
  return <div className="app">
    <Navigation/>
    <Routes>
      <Route path="/" element={<Poll />} />
      <Route path="/member" element={<Member />} />
      <Route path="/add_poll" element={<Add_poll />} />
      <Route path="/add_member" element={<Add_Member />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>;
}

export default App;
