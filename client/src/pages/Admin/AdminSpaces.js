import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SpaceForm from "../../components/SpaceForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

function AdminSpaces() {
  const dispatch = useDispatch();
  const [showSpaceForm, setShowSpaceForm] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpaces] = useState(null);
  const getSpaces = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/spaces/get-all-spaces",
        {}
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

  const deleteSpace = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/spaces/delete-space", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getSpaces();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  //Columns for the table in the Admin View

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "SpaceID",
      dataIndex: "SpaceID",
    },
    {
      title: "Location",
      dataIndex: "location",
    },

    {
      title: "Booking Date",
      dataIndex: "bookingDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-delete-bin-line"
            onClick={() => {
              deleteSpace(record._id);
            }}
          ></i>
          <i
            class="ri-pencil-line"
            onClick={() => {
              setSelectedSpaces(record);
              setShowSpaceForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getSpaces();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Study Spaces" />
        <button className="primary-btn" onClick={() => setShowSpaceForm(true)}>
          Add Study Spaces
        </button>
      </div>

      <Table columns={columns} dataSource={spaces} />

      {showSpaceForm && (
        <SpaceForm
          showSpaceForm={showSpaceForm}
          setShowSpaceForm={setShowSpaceForm}
          type={selectedSpace ? "edit" : "add"}
          selectedSpace={selectedSpace}
          setSelectedSpaces={setSelectedSpaces}
          getData={getSpaces}
        />
      )}
    </div>
  );
}

export default AdminSpaces;
