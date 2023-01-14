import { Col, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Space from "../components/Space";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function Home() {
  const { user } = useSelector((state) => state.users);
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [spaces, setSpaces] = useState([]);
  const getSpaces = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/spaces/get-all-spaces",
        tempFilters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setSpaces(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getSpaces();
  }, []);
  return (
    <div>
      <div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="Space Name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </Col>
          {/* <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="To"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col> */}
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Booking Date"
              value={filters.bookingDate}
              onChange={(e) =>
                setFilters({ ...filters, bookingDate: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getSpaces()}>
                Filter
              </button>

              <button
                className="outlined px-3"
                onClick={() =>
                  setFilters({
                    name: "",
                    // to: "",
                    bookingDate: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15, 15]}>
          {spaces
            .filter((space) => space.status === "Functional")
            .map((space) => (
              <Col lg={12} xs={24} sm={24}>
                <Space space={space} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
