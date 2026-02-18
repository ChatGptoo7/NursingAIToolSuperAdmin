import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CBadge,
  CButton
} from "@coreui/react";

 
import CIcon from "@coreui/icons-react";
import { cilArrowLeft, cilUser, cilEnvelopeOpen, cilCalendar, cilShieldAlt, cilLocationPin } from "@coreui/icons";

import "./UserDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useGetuserProfileDetails, useGetUserProfileDetailsById } from "../../hooks/User/User";
import { Badge, Col, Row } from "react-bootstrap";
import { BackButtonIcon } from "../../assets/icons/Icons";

export const  UserDetails=()=> {
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();

const { data: userData, refetch } = useGetUserProfileDetailsById(id);
    useEffect(()=>{
      if(userData){
        setUser(userData?.data?.responseObject)
      }
    },[userData])
    
  const [user, setUser] = useState<any>(null);
 

//   if (!user) return <p className="p-3">Loading user details...</p>;

  return (
    <>
      {/* ---------- USER PROFILE CARD ---------- */}
      <div className="common_card pb-0">
        <div className="top_bar_tittle top_bar_border">
            <h3 className="d-flex align-items-center gap-2">
              <button className="bg-transparent border-0 d-flex align-items-center p-0" onClick={() => navigate("/user", { replace: true })}>
                <BackButtonIcon />
              </button>
              User Information
            </h3>
        </div>
        
            <div  className="user_info_img mb-3">
               {
                !user?.profilePicUrl && (

                  <div className="details_inti">
                    <span>{user?.firstName?.charAt(0).toUpperCase()}</span>
                  </div>
                )
              }{
                user?.profilePicUrl && (

                  <div className="details_inti">
                  <img src={user?.profilePicUrl} alt="" />
                </div>
                )
              }

            </div>

            {/* ---------- DETAILS SECTION ---------- */}
            <Row>
              <Col sm={6} md={4} lg={4} className="mb-3">
                <div className="stats_txt">
                  <h3>Fisrt Name</h3>
                  <p>{user?.firstName}</p>
                </div>
              </Col>
              <Col sm={6} md={4} lg={4} className="mb-3">
                <div className="stats_txt">
                  <h3>Last Name</h3>
                  <p>{user?.lastName}</p>
                </div>
              </Col>
              <Col sm={6} md={4} lg={4} className="mb-3">
                <div className="stats_txt">
                  <h3>Email</h3>
                  <p>{user?.email}</p>
                </div>
              </Col>
              <Col sm={6} md={4} lg={4} className="mb-3">
                <div className="stats_txt">
                  <h3>Role</h3>
                  {/* <p>{user?.userType}</p> */}
                  <Badge bg={user?.userType === "admin" ? "danger" : "info"}>
                    {user?.userType.toUpperCase()}
                  </Badge>
                </div>
              </Col>
              <Col sm={6} md={4} lg={4} className="mb-3">
                <div className="stats_txt">
                  <h3>Account Created</h3> 
                  <p>{new Date(user?.createdAt).toLocaleString()}</p>
                </div>
              </Col>
              <Col sm={6} md={4} lg={4} className="mb-3">
                <div className="stats_txt">
                  <h3>Last Updated</h3> 
                  <p>{new Date(user?.updatedAT).toLocaleString()}</p>
                </div>
              </Col>
              <Col sm={6} md={4} lg={4} className="mb-3">
                <div className="stats_txt">
                  <h3>Status</h3>
                  <CBadge color={!user?.isActive   ? "danger" : "success"} className="">
                    {user?.isActive?'Active':"Inactive"}
                  </CBadge>
                </div>
              </Col>

            </Row>
      </div>
    </>
  );
}
