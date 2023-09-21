import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
} from "@mui/material";

import api from '../../api';
import './index.css';

const IssueCard = ({ issue }) => {
  const {
    score,
    title,
    number,
    relativeDateCreated,
    opener,
    labels = [],
  } = issue;
  return (
    <Card className="issue" onClick={() => {}}>
      <CardContent className="content">
        <Box className="score">{score}</Box>
        <Box className="body">
          <Box className="title"> {title} </Box>
          <Box className="details">
            #{number}, opened {relativeDateCreated} days by {opener}{" "}
          </Box>
          <Box className="labels">
            {" "}
            {labels.map((label, index) => (
              <Box className="label" key={index}>
                {" "}
                {label.name}{" "}
              </Box>
            ))}{" "}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
const Home = () => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([])
  
  useEffect(() => {
    api.getUsers().then(({ users }) => setUsers(users));
  }, []);

  useEffect(() => {
    api.getIssues(user).then(({ issues }) => setIssues(issues));
  }, [user]);

  return (
    <Box className="content">
      <Box className="title"> Welcome to Github Issue Tracker App</Box>
      <Box className="user-select">
        <InputLabel> Show issues assigned to: </InputLabel>
        <Select
          value={user}
          displayEmpty
          onChange={(e) => setUser(e.target.value)}
        >
          <MenuItem value=""> All </MenuItem>
          {users.map(username => <MenuItem value={username}> {username} </MenuItem>)}
        </Select>
      </Box>
      <Box className="issues">
        {issues.map((issue, index) => (
          <IssueCard key={index} issue={issue} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
