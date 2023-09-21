import React, { useState } from 'react';
import { Box, Select, MenuItem, InputLabel, Card, CardContent } from '@mui/material'

const issues = [{ score: 110, title: "something happened", number: "1234", relativeDateCreated: "7 days", opener: "martinflory", labels: [ { name: "Unison", color: "yellow" }, { name: "High Priority", color: "red" }, { name: "Mobile", color: "blue" }]},
{ score: 80, title: "another thing happened", number: "1235", relativeDateCreated: "5 days", opener: "martinflory", labels: [ { name: "Unison", color: "yellow" }, { name: "Low Priority", color: "green" }, { name: "Mobile", color: "blue" }]}]

const IssueCard = ({ issue }) => {
  const { score, title, number, relativeDateCreated, opener, labels = [] } = issue;
  return <Card>
    <CardContent>
      <Box className="score">{score}</Box>
      <Box className="issue-body">
        <Box className="title"> {title} </Box>
        <Box className="details">#{number}, opened {relativeDateCreated} days by {opener} </Box>
        <Box className="labels"> {
          labels.map((label,index) => (<Box className="label" key={index}> {label.name} </Box>))
        } </Box>
      </Box>
    </CardContent>
  </Card>
}
const Home = () => {
  const [user, setUser] = useState('');

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
          <MenuItem value=''> All </MenuItem>
          <MenuItem value="@aailenm">@aailenm</MenuItem>
        </Select>
        </Box>
        <Box className="issues">
          {
            issues.map((issue, index) => (
              <IssueCard key={index} issue={issue}/>
            ))
          }
        </Box>
      </Box>
    );
  }
  
  export default Home;