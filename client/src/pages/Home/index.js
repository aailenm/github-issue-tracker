import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
} from "@mui/material";

import api from "../../api";
import { Link, useSearchParams } from "react-router-dom";
import "./index.css";

const IssueCard = ({ issue }) => {
  const {
    score,
    title,
    number,
    workingDaysFromCreation,
    opener,
    labels = [],
    url,
  } = issue;
  return (
    <Link to={url} className="link" target="_blank">
      <Card className="issue">
        <CardContent className="content">
          <Box className={score > 100 ? `warning score` : `score`}>{score}</Box>
          <Box className="body">
            <Box className="title"> {title} </Box>
            <Box className="details">
              #{number}, opened {workingDaysFromCreation} days ago by {opener}{" "}
            </Box>
            <Box className="labels">
              {" "}
              {labels.map((label, index) => (
                <Box
                  className="label"
                  key={index}
                  sx={{ backgroundColor: `#${label.color}` }}
                >
                  {" "}
                  {label.name}{" "}
                </Box>
              ))}{" "}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const user = searchParams.get("who") || "";
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.getUsers().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    api.getIssues(user).then((issues) => setIssues(issues));
  }, [user]);

  return (
    <Box className="content">
      <Box className="title"> Welcome to the Github Issue Tracker</Box>
      <Box className="user-select">
        <InputLabel> Show issues assigned to: </InputLabel>
        <Select
          value={user}
          displayEmpty
          onChange={(e) => setSearchParams({ who: e.target.value })}
          className="selector"
        >
          <MenuItem value=""> All </MenuItem>
          {users.map((username) => (
            <MenuItem value={username}> {username} </MenuItem>
          ))}
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
