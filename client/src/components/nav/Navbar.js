import React, { useState, useEffect } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn } from "./NavbarElements";
import "../../index.css";
import { Drawer, Form, Button, Col, Row, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../routes/Coupon";
import { PlusOutlined } from "@ant-design/icons";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    if (user && user.token) {
      dispatch({
        type: "VISIBLE",
        payload: true,
      });
      setVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/` },
      });
    }
  };

  const onClose = () => {
    dispatch({
      type: "VISIBLE",
      payload: false,
    });
    setVisible(false);
  };

  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={require("../../images/logo.svg")} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn className="btncss" onClick={showDrawer}>
          Apply For Coupon
        </NavBtn>
      </Nav>

      <Drawer
        title="Apply for Coupon"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please Enter User Name" }]}
              >
                <Input placeholder="Please Enter User Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true, message: "Please Enter Your Email" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonBefore="Email"
                  placeholder="Please Enter Your Email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Tell Us Why you Want Coupon So We Could Help YOU",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter any Query You Have So We Can Help you Or maybe we can help you getting Coupon"
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
          <Loading />
        </Form>
      </Drawer>
    </>
  );
};

export default Navbar;
