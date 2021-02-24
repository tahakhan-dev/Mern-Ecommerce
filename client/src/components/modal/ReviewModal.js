import React, { useState, useEffect } from "react";
import { Modal, Comment, Avatar, Rate, Pagination } from "antd";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { ReadOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import { getProductReviewAndRating } from "../../functions/product";
import Loading from "../routes/Comment";

var _ = require("lodash");

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const ReviewModal = ({ product }) => {
  const { user, Modals } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);

  const { reviews, ratings } = product;
  let comments = [];
  let objectLength;
  let ratingPostedBy;
  let reviewPostedBy;
  let pageCount = 3;

  function ArraySlicePagination(pageNumber, pageCount) {
    // end will not be included in array.slice(1,10)
    var end = pageNumber * pageCount;
    var start = end - pageCount;
    return {
      Start: start,
      End: end,
    };
  }

  if (ratings && reviews) {
    objectLength = Object.keys(reviews).length;

    for (var i = 0; i < objectLength; i++) {
      ratingPostedBy = ratings[i].postedBy;
      reviewPostedBy = reviews[i].postedBy;

      if (ratingPostedBy == reviewPostedBy) {
        comments.push({
          id: i,
          Date: reviews[i].Date.substring(0, 10),
          star: ratings[i].star,
          review: reviews[i].review,
        });
      }
    }
  }
  var pagination = ArraySlicePagination(page, pageCount);
  var response = comments.slice(pagination.Start, pagination.End);

  const handleModal = () => {
    setModalVisible(true);
    dispatch({
      type: "VISIBLE",
      payload: true,
    });
  };

  const handleCancel = () => {
    dispatch({
      type: "VISIBLE",
      payload: false,
    });
    setModalVisible(false);
  };

  const handleOk = () => {
    dispatch({
      type: "VISIBLE",
      payload: false,
    });
    setModalVisible(false);
  };

  return (
    <>
      <div>
        <div onClick={handleModal}>
          <ReadOutlined style={{ color: "#833F72" }} /> <br />{" "}
          {"View User Review"}
        </div>
        <Modal
          title="User Review"
          centered
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {response.length ? (
            response.map((r) => (
              <div key={r.id}>
                <Avatar
                  icon={<UserOutlined />}
                  size="large"
                  style={{ color: "#8E2015", backgroundColor: "#fde3cf" }}
                ></Avatar>
                <h6 className="pt-2">
                  <Rate tooltips={desc} disabled value={r.star} />
                </h6>
                <b>
                  <i>
                    <p>{r.review}</p>
                  </i>
                </b>
                <p
                  className="float-right"
                  style={{ color: "#053D8B", backgroundColor: "#F6E5DB" }}
                >
                  {r.Date}
                </p>
                <hr />
                <nav aria-label="Page navigation example">
                  <Pagination
                    responsive={true}
                    current={page}
                    onChange={(value) => setPage(value)}
                    total={comments.length * 5}
                  />
                </nav>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>
              <h2>No Comments Yet</h2>
              <p className="text-info">
                Become First User To Post A comment About This Product
              </p>
              <Loading />
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ReviewModal;
