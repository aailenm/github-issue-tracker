import { Box, Select, MenuItem, InputLabel } from "@mui/material";
import "../index.css";

const UserSelector = ({ users, selectedUser, selectUser }) => {
  return (
    <Box className="user-select">
      <InputLabel className="label"> Show issues assigned to: </InputLabel>
      <Select
        value={selectedUser}
        displayEmpty
        onChange={(e) => selectUser(e.target.value)}
        className="selector"
      >
        <MenuItem className="menu-item" value=""> All </MenuItem>
        {users.map((username, index) => (
          <MenuItem className="menu-item" value={username} key={index}>
            {" "}
            {username}{" "}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default UserSelector;
