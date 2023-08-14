import logo from './logo.svg';
import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import {CreatePost} from "./component/CreatePost";
import ListPost from './component/ListPost';

function App() {
  return (
   <>
       <Routes>
           <Route path="/createPost" element={<CreatePost/>}/>
       </Routes>

       </>
  );
}

export default App;
