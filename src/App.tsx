import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import 'twind/shim'
import { HomeView } from './views/home'
import { EditUserView } from './views/edit-user'
import { Icon } from '@iconify/react';
import githubIcon from "@iconify/icons-mdi/github";

function App() {
  
  return (
  <div className="h-screen flex flex-col justify-between">
    <nav className="flex flex-row bg-gray-200 p-3 items-center justify-between">
      <p>Welcome to Rick and Morty <b>CRUD</b></p>
      <a href="https://github.com/kasec/rick-and-morty-crud" className="hover:bg-gray-300 rounded-full shadow p-1">
        <Icon icon={githubIcon} height="30"/>
      </a>
    </nav>
    <section className=" h-5/6 overflow-auto">
      <Router>
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path='/user/:id' component={EditUserView}></Route> 
        </Switch>
      </Router>
    </section>
    <footer className="py-2 flex justify-center items-center bg-gray-800">
      <p className="text-gray-200">Created by <b>galfan</b> @2020 </p>
    </footer>
  </div>
  )
}

export default App
