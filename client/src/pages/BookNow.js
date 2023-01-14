import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import StripeCheckout from "react-stripe-checkout";
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [space, setSpace] = useState(null);
  const getSpace = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/spaces/get-space-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setSpace(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        space: space._id,
        seats: selectedSeats,
        transactionId,
      });

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * space.price * 100,
      });

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getSpace();
  }, []);
  return (
    <div>
      {space && (
        <Row className="mt-3" gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl primary-text">{space.name}</h1>

            <h1 className="text-md">{space.SpaceID}</h1>
            <hr />

            <div className="flex flex-col gap-2">
              <p className="text-md">Booking Date : {space.bookingDate}</p>
              <p className="text-md">Price : $ {space.price} /-</p>
              <p className="text-md">Opening Hours : {space.openinghrs}</p>
              <p className="text-md">Closing Hours : {space.closinghrs}</p>
              <p className="text-md">Capacity : {space.capacity}</p>
              <p className="text-md">
                Seats Left : {space.capacity - space.seatsBooked.length}
              </p>
            </div>
            <hr />

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">
                Selected Seats : {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-2xl mt-2">
                Total Amount : ${space.price * selectedSeats.length} /-
              </h1>
              <hr />

              <StripeCheckout
                billingAddress
                token={onToken}
                amount={space.price * selectedSeats.length * 100}
                currency="USD"
                stripeKey="pk_test_51MCELtEvapwGdt8Eugu930CV2doUbfOYvW2ojJT2BzdX5YjfglBd4Kp5q4hNew02VqtjeISxlLepiNcSeAQzfHul00UU840Siz"
              >
                <button
                  className={`primary-btn ${
                    selectedSeats.length === 0 && "disabled-btn"
                  }`}
                  disabled={selectedSeats.length === 0}
                >
                  Book Now
                </button>
              </StripeCheckout>
              <hr />
              {/*Viewing of the Google Form */}
              <iframe
                width="550"
                height="300"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=Boston&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </Col>

          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              space={space}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
// GoogleApiWrapper({apiKey:"AIzaSyAIfQvjo6B_w8AeXAwxwsdNgWT3MFgYuH0"})(MapContainer);
