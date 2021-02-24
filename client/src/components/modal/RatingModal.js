import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { LikeOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const RatingModal = ({
  children,
  handlesubmit,
  inputValue,
  setOkratingreview,
  existingrating,
}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      {existingrating ? (
        <div>
          <LikeOutlined className="text-success" />
          <p>Already Posted Review</p>
        </div>
      ) : (
        <div>
          <div onClick={handleModal}>
            <StarOutlined className="text-danger"  /> <br />{" "}
            {user ? "Leave rating" : "Login to leave rating"}
          </div>
          <Modal
            title="Leave your rating"
            centered
            visible={modalVisible}
            onOk={() => {
              setModalVisible(false);
              toast.success("Thanks for your review. It will apper soon");
              {
                setOkratingreview(true);
              }
            }}
            onCancel={() => {
              setModalVisible(false);
            }}
          >
            {children}

            <div className="pt-3 mt-2">
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                allowClear
                maxLength={220}
                value={inputValue}
                onChange={handlesubmit}
                placeholder="Enter The Product Review"
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default RatingModal;
