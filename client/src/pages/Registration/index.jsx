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
import { usePostRegApiMutation } from "../../api/services/authApi";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const [regApi, { isLoading }] = usePostRegApiMutation();

    //store success
    const [formSuccess, setFormSuccess] = useState("");
    const [isAlert, setAlert] = useState(false);

    //store form errors
    const [formErrors, setFormErrors] = useState([]);

    // store form data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formHandler = async (e) => {
        e.preventDefault();

        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };

        const res = await regApi(formData);
        if (res?.data) {
            setAlert(true);
            setFormSuccess(res?.data.msg);
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 2000);
        }

        if (res.error?.data.errors.length !== 0) {
            setFormErrors(res.error?.data.errors);
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
                            <Grid item lg={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="First name"
                                    variant="standard"
                                    size="small"
                                    fullWidth
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    value={firstName}
                                />
                                {typeof formErrors !== "undefined" &&
                                    formErrors.map((item, index) => {
                                        if (item.param === "firstName") {
                                            return (
                                                <span
                                                    key={index}
                                                    style={{
                                                        color: "red",
                                                        marginTop: "4px",
                                                    }}
                                                >
                                                    {item.msg}
                                                </span>
                                            );
                                        }
                                    })}
                            </Grid>
                            <Grid item lg={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="Last name"
                                    variant="standard"
                                    size="small"
                                    fullWidth
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    value={lastName}
                                />
                                {typeof formErrors !== "undefined" &&
                                    formErrors.map((item, index) => {
                                        if (item.param === "lastName") {
                                            return (
                                                <span
                                                    key={index}
                                                    style={{
                                                        color: "red",
                                                        marginTop: "4px",
                                                    }}
                                                >
                                                    {item.msg}
                                                </span>
                                            );
                                        }
                                    })}
                            </Grid>
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
                                        mr
                                    >
                                        Registration
                                    </Button>
                                </Box>
                                <Link to="/login">Go To Login ?</Link>
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
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Registration;
