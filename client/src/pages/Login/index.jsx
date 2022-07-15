import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Grid,
    Snackbar,
    TextField,
} from "@mui/material";

import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useState } from "react";
import { usePostLoginApiMutation } from "../../api/services/authApi";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const [logApi, { isLoading }] = usePostLoginApiMutation();

    //store success
    const [formSuccess, setFormSuccess] = useState("");
    const [isAlert, setAlert] = useState(false);

    //store form errors
    const [formErrors, setFormErrors] = useState([]);

    // store form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formHandler = async (e) => {
        e.preventDefault();

        const formData = {
            email: email,
            password: password,
        };

        const res = await logApi(formData);

        if (res.data) {
            setAlert(true);
            setFormSuccess(res?.data.msg);
            window.localStorage.setItem(
                "_haiderLogin",
                JSON.stringify({ token: res?.data.token })
            );
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000);
        }

        if (res.error.data.errors) {
            setFormErrors(res.error.data.errors);
        } else {
            setFormErrors([]);
        }
    };
    return (
        <>
            <Container maxWidth="lg">
                <form onSubmit={formHandler}>
                    <Grid
                        container
                        justifyContent="center"
                        paddingTop={10}
                        paddingBottom={10}
                    >
                        <Grid container lg={5} spacing={2}>
                            <Grid item lg={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Enter email"
                                    variant="standard"
                                    size="small"
                                    type="email"
                                    fullWidth
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                />
                                {typeof formErrors !== "undefined" &&
                                    formErrors.map((item, index) => {
                                        if (item.param === "email") {
                                            return (
                                                <span
                                                    key={index}
                                                    style={{
                                                        color: "red",
                                                        marginTop: "4px",
                                                    }}
                                                >
                                                    {item.msg} <br />
                                                </span>
                                            );
                                        }
                                    })}
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    variant="standard"
                                    size="small"
                                    fullWidth
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                />
                                {typeof formErrors !== "undefined" &&
                                    formErrors.map((item, index) => {
                                        if (item.param === "password") {
                                            return (
                                                <span
                                                    key={index}
                                                    style={{
                                                        color: "red",
                                                        marginTop: "4px",
                                                    }}
                                                >
                                                    {item.msg} <br />
                                                </span>
                                            );
                                        }
                                    })}
                            </Grid>
                            <Grid
                                item
                                container
                                alignItems="center"
                                gap={2}
                                lg={12}
                            >
                                <Box>
                                    <Button
                                        loading
                                        type="submit"
                                        variant="contained"
                                    >
                                        Login
                                    </Button>
                                </Box>
                                <Link to="/registration">
                                    Go To Registration ?
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Snackbar
                        open={isAlert && true}
                        autoHideDuration={1000}
                        onClose={() => {
                            setAlert(false);
                        }}
                    >
                        <Alert severity="success" sx={{ width: "100%" }}>
                            {formSuccess}
                        </Alert>
                    </Snackbar>
                </form>
            </Container>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading && true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Registration;
