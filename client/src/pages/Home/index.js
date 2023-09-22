import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import IssueCard from "./components/IssueCard";
import UserSelector from "./components/UserSelector";
import api from "../../api";
import { useSearchParams } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedUser = searchParams.get("who") || "";
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.getUsers().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    api.getIssues(selectedUser).then((issues) => setIssues(issues));
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
        <UserSelector
          users={users}
          selectedUser={selectedUser}
          selectUser={selectUser}
        />
        <Box className="issues">
          {issues.map((issue, index) => (
            <IssueCard key={index} issue={issue} />
          ))}
        </Box>
    </Box>
  );
};

export default Home;
