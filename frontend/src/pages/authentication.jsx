import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
        console.log(result);
        navigate("/home");
        setUsername("");
        setMessage("Login Successfull");
        setOpen(true);
        setError("");
        setPassword("");
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setName("");
        setMessage(result);
        setOpen(true);
        setError("");
        setPassword("");
        setFormState(0);
      }
    } catch (err) {
      let message = err?.response?.data?.message;
      setError(message || "An error occurred");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        
        
        <Box
          sx={{
            flex: "0 0 58%",
            backgroundImage: "url(/road.avif)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#1976d2",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" }, 
          }}
        />
        
        
        <Box
          component={Paper}
          elevation={6}
          square
          sx={{
            flex: { xs: "1", md: "0 0 42%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Box sx={{ mb: 2 }}>
            <Button
              variant={formState === 0 ? "contained" : "outlined"}
              onClick={() => {
                setFormState(0);
                setError("");
              }}
              sx={{ mr: 1 }}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? "contained" : "outlined"}
              onClick={() => {
                setFormState(1);
                setError("");
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Box component="form" noValidate sx={{ mt: 1, width: "100%", maxWidth: 400 }}>
            {formState === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Box sx={{ color: "error.main", mt: 2, fontSize: "0.875rem" }}>
                {error}
              </Box>
            )}

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAuth}
            >
              {formState === 0 ? "Log In" : "Register"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}