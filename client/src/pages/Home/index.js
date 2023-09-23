import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import IssueCard from "./components/IssueCard";
import UserSelector from "./components/UserSelector";
import api from "../../api";
import { useSearchParams } from "react-router-dom";
import EmptyState from './components/EmptyState';

import "./index.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedUser = searchParams.get("who") || "";
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    api.getUsers().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    api
      .getIssues(selectedUser)
      .then((issues) => setIssues(issues))
      .catch(() => setHasErrors(true));
  }, [selectedUser]);

  const selectUser = (newUser) => {
    setSearchParams({ who: newUser });
  };

  return (
    <Box className="content">
      <Box className="hero">
        <Box className="title">
          Welcome to the <br />{" "}
          <span className="accent"> Github Issue Tracker </span>
        </Box>
      </Box>
      {hasErrors ? (
        <EmptyState message="Something went wrong 😞 - Please refresh the page."/>
      ) : (
        <>
          <UserSelector
            users={users}
            selectedUser={selectedUser}
            selectUser={selectUser}
          />
          <Box className="issues">
            {issues.length > 0 ? (
              issues.map((issue, index) => (
                <IssueCard key={index} issue={issue} />
              ))
            ) : (
              <EmptyState message="Well done👌 You don't have any issues assigned for this repo." />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
