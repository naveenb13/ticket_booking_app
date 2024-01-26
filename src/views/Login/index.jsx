import React, { useEffect } from 'react'
import { Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form';
import { toast, Storage } from '../../helper';
import { useNavigate } from 'react-router-dom'
import { IoTicketOutline } from "react-icons/io5";

const Login = () => {

    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const database = [
        {
            "id": 1,
            "movie_name": "Avengers",
            "overallSeats": ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'
            ],
            "seatsAvailable": ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'
            ],
            "seatsBooked": [],
            "seatsSelected": [],
            "active": true
        },
        {
            "id": 2,
            "movie_name": "Batman",
            "overallSeats": ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'
            ],
            "seatsAvailable": ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'
            ],
            "seatsBooked": [],
            "seatsSelected": [],
            "active": false
        },
        {
            "id": 3,
            "movie_name": "Spiderman",
            "overallSeats": ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'
            ],
            "seatsAvailable": ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'
            ],
            "seatsBooked": [],
            "seatsSelected": [],
            "active": false
        }
    ]

    useEffect(() => {
        if (Storage.isLoggedin("userData") && Storage.isDataAvailable("data")) {
            navigate(`/home`)
        } else {
            Storage.logout("userData")
            sessionStorage.removeItem("data")
            navigate('/')
        }
    }, [Storage])

    const passwordValidate = (item) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (item.length === 8 && passwordPattern.test(item) !== true) {
            return toast("Password should contain atleast one uppercase letter, lower case letter, special characters & number", "error")
        }
    }

    const onLoginSubmit = (data) => {
        if (data && data.username && data.password) {
            Storage.set("userData", data);
            sessionStorage.setItem("data", JSON.stringify(database));
            toast("Login Successful", "success")
            navigate('/home')
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center page-container'>
            <div className='d-flex flex-row mb-4'>
                <IoTicketOutline color='white' size={"30px"} className='me-2' />
                <h3 style={{ color: 'white', fontWeight: 'bold' }}>TICKETTROVE</h3>
            </div>
            <Row>
                <div className='login-container p-3'>
                    <Form onSubmit={handleSubmit(onLoginSubmit)}>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Controller
                                name="username"
                                control={control}
                                id="username"
                                rules={{ required: true }}
                                render={({ field }) => <Input placeholder="Enter Username" invalid={errors.username && true} type="text" {...field} />}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Controller
                                name="password"
                                control={control}
                                id="password"
                                rules={{
                                    required: true,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                }}
                                render={({ field }) => <Input onInput={(e) => passwordValidate(e.target.value)} maxLength={8} invalid={errors.password && true} placeholder="Enter Password" type="password" {...field} />}
                            />
                        </FormGroup>
                        <Button type='submit' color='success'>Login</Button>
                    </Form>
                </div>
            </Row>
        </div>
    )
}

export default Login