import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// Display of space in the form of card layout with options such as Location, Price and
//Booking Date
function Space({ space }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  return (
    <div className="card p-2">
      <h1 className="text-lg primary-text">{space.name}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-sm">Location</p>
          <p className="text-sm">{space.location}</p>
        </div>

        <div>
          <p className="text-sm">Price</p>
          <p className="text-sm">$ {space.price} /-</p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="text-sm">Booking Date</p>
          <p className="text-sm">{space.bookingDate}</p>
        </div>

        <h1
          className="text-lg underline secondary-text"
          onClick={() => {
            navigate(`/book-now/${space._id}`);
          }}
        >
          {user?.isAdmin ? "" : "Book Now"}
        </h1>
      </div>
    </div>
  );
}

export default Space;
