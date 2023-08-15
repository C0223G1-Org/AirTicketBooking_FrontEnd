import logo from './logo.svg';
import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import {CreatePost} from "./component/post/CreatePost";
import ListPost from './component/post/ListPost';
import {UpdatePost} from "./component/post/UpdatePost";

function App() {
  return (
   <>
       <Routes>
           <Route path="/listPost" element={<ListPost/>}/>
           <Route path="/createPost" element={<CreatePost/>}/>
           <Route path="/updatePost/:id" element={<UpdatePost/>}/>
       </Routes>

       </>
  );
}

export default App;
