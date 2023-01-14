import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function SpaceForm({
  showSpaceForm,
  setShowSpaceForm,
  type = "add",
  getData,
  selectedSpace,
  setSelectedSpaces,
}) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/spaces/add-space", values);
      } else {
        response = await axiosInstance.post("/api/spaces/update-space", {
          ...values,
          _id: selectedSpace._id,
        });
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowSpaceForm(false);
      setSelectedSpaces(null);

      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <Modal
      width={800}
      title={type === "add" ? "Add Study Space" : "Update Study Space"}
      visible={showSpaceForm}
      onCancel={() => {
        setSelectedSpaces(null);
        setShowSpaceForm(false);
      }}
      footer={false}
    >
      {/*Form for adding a Study Space */}
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedSpace}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Study Space Name" name="name">
              <input type="text" required />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Space ID" name="SpaceID">
              <input type="text" required />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Capacity" name="capacity">
              <input type="text" required />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Location" name="location">
              <input type="text" required />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Booking Date" name="bookingDate">
              <input type="date" required />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Opening Hours" name="openinghrs">
              <input type="time" required />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Closing Hours" name="closinghrs">
              <input type="time" required />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Charges" name="price">
              <input type="text" required />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="status">
              <select name="" id="">
                <option value="Functional">Functional</option>
                <option value="Under Maintenance">Under Maintenance</option>
                {/* <option value="Completed">Completed</option> */}
              </select>
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button className="primary-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}
export default SpaceForm;
