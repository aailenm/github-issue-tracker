import { Link } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
  } from "@mui/material";

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

  export default IssueCard;