import React, {useContext} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../Home";
import LoginForm from "../Componenents/Auth/LoginForm";
import SignupForm from "../Componenents/Auth/SignupForm";
import UserContext from "../Componenents/Auth/UserContext";
import Search from "../Componenents/SearchCharacters/Search";
import SearchResults from "../Componenents/Comics/SearchResults";
import ReadingList from "../Componenents/Comics/ReadingList";

import ProtectedRoute from "./ProtectedRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <ProtectedRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function MarvelRoutes({signup, login}) {
  const {currentUser} = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />
      <Route path="/search" element={<Search />} />
      <Route path="/comics/search/:charOneId/:charTwoId/:offset" element={<SearchResults />} />
      <Route path="/readinglist" element={<ReadingList />} />


    </Routes>
  );
}

export default MarvelRoutes;
