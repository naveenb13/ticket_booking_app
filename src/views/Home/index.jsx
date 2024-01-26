import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { toast, Storage } from '../../helper';
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const result = sessionStorage.getItem("data");
    const navigate = useNavigate();

    const [moviesData, setMoviesData] = useState([])
    const [movieSeats, setMovieSeats] = useState([])

    useEffect(() => {
        if (Storage.isLoggedin("userData") && Storage.isDataAvailable("data")) {
            navigate(`/home`)
        } else {
            Storage.logout("userData")
            sessionStorage.removeItem("data")
            navigate('/')
        }
    }, [Storage])

    useEffect(() => {
        if (result) {
            let ans = JSON.parse(result)
            let res = ans.filter((item) => item.active === true)
            setMoviesData(ans)
            setMovieSeats(res[0])
        }
    }, [result])

    const bookSeats = (item) => {
        if (movieSeats && movieSeats.seatsBooked.indexOf(item) > -1) {
            let temp = { ...movieSeats }
            temp.seatsAvailable = movieSeats.seatsAvailable.concat(item)
            temp.seatsBooked = movieSeats.seatsBooked.filter((i) => i != item)
            setMovieSeats(temp)
        } else {
            let temp = { ...movieSeats }
            temp.seatsBooked = movieSeats.seatsBooked.concat(item)
            temp.seatsAvailable = movieSeats.seatsAvailable.filter((i) => i != item)
            setMovieSeats(temp)
        }
    }

    const selectMovie = (e) => {
        let res = [...moviesData]
        let temp = moviesData && moviesData.findIndex((item) => item.active === true)
        let temp1 = moviesData && moviesData.findIndex((item) => item.movie_name === e.target.value)
        res[temp].active = false;
        res[temp1].active = true;
        sessionStorage.setItem("data", JSON.stringify(res));
        setMovieSeats(res && res.filter((item) => item.active === true)[0])
    }

    const confirmTickets = () => {
        let temp = [...moviesData]
        let temp1 = { ...movieSeats }
        temp1.seatsSelected = movieSeats.seatsSelected.concat(movieSeats.seatsBooked)
        temp1.seatsBooked = []
        setMovieSeats(temp1)
        const answer = temp.findIndex((item) => item.id === movieSeats.id);
        temp[answer] = temp1;
        sessionStorage.setItem("data", JSON.stringify(temp));
        toast("Booking successful", 'success')
    }

    const disable = (item) => {
        if (movieSeats && movieSeats.seatsSelected.indexOf(item) > -1) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center container mt-5'>
            <Row className='mb-5'>
                <Col lg={12} md={12} sm={12} className='d-flex flex-row justify-content-center'>
                    <h5 style={{ color: 'purple' }} className='me-2'>Select a movie:</h5>
                    <select value={movieSeats && movieSeats.movie_name} onChange={(e) => selectMovie(e)}>
                        {
                            moviesData && moviesData.map((item) => {
                                return <option value={item.movie_name}>{item.movie_name}</option>
                            })
                        }
                    </select>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col lg={12} md={12} sm={12} className='d-flex flex-row justify-content-between category-bg px-4 py-3 rounded'>
                    <div className='px-2 d-flex flex-row justify-content-center align-items-center'>
                        <div style={{ background: "white", width: "20px", height: "20px" }}></div>
                        <h6 className='ms-2 mb-0'>N/A</h6>
                    </div>
                    <div className='px-2 d-flex flex-row justify-content-center align-items-center'>
                        <div style={{ background: "green", width: "20px", height: "20px" }}></div>
                        <h6 className='ms-2 mb-0'>Selected</h6>
                    </div>
                    <div className='px-2 d-flex flex-row justify-content-center align-items-center'>
                        <div style={{ background: "black", width: "20px", height: "20px" }}></div>
                        <h6 className='ms-2 mb-0'>Occupied</h6>
                    </div>
                </Col>
            </Row>
            <div style={{ backgroundColor: 'lightgrey' }} className='mb-5 p-2 card-bg'>
                <Row className='my-2'>
                    {
                        movieSeats && movieSeats.overallSeats && movieSeats.overallSeats.map((item) => {
                            return <Col lg={2} md={2} sm={2} xs={2} className='mt-2 d-flex align-items-center justify-content-center'><div style={{ width: "20px", height: "20px" }} className={(movieSeats.seatsAvailable.indexOf(item) > -1 && 'white-color-seat') || (movieSeats.seatsBooked.indexOf(item) > -1 && "green-color-seat") || "black-color-seat"} onClick={disable(item) ? () => bookSeats(item) : null}></div></Col>
                        })
                    }
                </Row>
            </div>
            <div className='mb-3'>
                <p>You have selected {movieSeats && movieSeats.seatsBooked && movieSeats.seatsBooked.length} {movieSeats && movieSeats.seatsBooked && movieSeats.seatsBooked.length === 1 ? "seat" : "seats"} for a price of {movieSeats && movieSeats.seatsBooked && (movieSeats.seatsBooked.length * 200)}</p>
            </div>
            <Button type='submit' onClick={() => confirmTickets()}>Book</Button>
        </div>
    )
}

export default Home