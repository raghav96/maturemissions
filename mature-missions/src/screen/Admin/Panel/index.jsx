/**
 * File: AdminPanel.jsx
 * Description: Component for the admin panel containing various sections.
 */

import React from "react";
import "./index.css";
import Header from '../../../Components/header';
import ManageUsers from "../../../Components/admin-panel/manage-users";
import ViewPayments from "../../../Components/admin-panel/view-payments";
import ReportedServices from "../../../Components/admin-panel/reported-services";
import ViewServiceRequests from "../../../Components/admin-panel/view-service-requests";

const AdminPanel = (props) => {

    // Props to get isItemClicked and itemIndex
    const { isItemClicked, itemIndex } = props;

    // Array containing panel items/components
    const panelItems = [<ManageUsers />, <ViewPayments />, <ReportedServices />, <ViewServiceRequests />];

    return (
        <div className="admin-panel-container">
            { localStorage.getItem('userRole') !== "ROLE_ADMIN" ? (
                <>
                    <Header type={"default"} loggedIn={false} elder={false} />
                    <div className='success-fail-component'>
                        <div><b>Admin Error</b></div>
                        <div>Unable to Access Admin Panel</div>
                    </div>
                </>
                
            ) : (
                <>
                    <Header type={"admin"} />
                    <div className="admin-panel-subcontainer">
                        <div className="admin-panel-directory">
                            <ul className="panel-items">
                                <a href="/admin/manage-users" className="panel-item"><li>Manage Users</li></a>
                                <a href="/admin/view-payments" className="panel-item"><li>View Payments</li></a>
                                <a href="/admin/reported-services" className="panel-item"><li>Reported Services</li></a>
                                <a href="/admin/view-service-requests" className="panel-item"><li>View Service Requests</li></a>
                            </ul>
                        </div>
                        <div className="admin-panel-content">
                            {isItemClicked === "false" ? (
                                <div className="admin-panel-box">
                                    <p>WELCOME TO MATURE MISSION ADMIN PANEL</p>
                                </div>
                            ) : (
                                <div className="admin-panel-item-box">
                                    <div className="panel-item-content">
                                        {panelItems[itemIndex]}
                                    </div>
                                </div>
                            )}
                        </div> 
                    </div>
                </>
            )};
        </div>
    );
};

export default AdminPanel;
