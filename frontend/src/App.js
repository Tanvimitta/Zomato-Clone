import { Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import Home from "./components/Home";
// import Restaurant from "./components/Restauraant";
import Restaurant from "./components/Restauraant";


function App() {
  return <>
  <section className="container-fluid">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search/:id/:name" element={<Search/>} />
      <Route path="/restaurant-details/:id" element={<Restaurant/>} />
    </Routes>

   
    </section>
  </>
}

export default App;
