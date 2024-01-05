/* 
    File: ManageUsers.jsx
    Description: Component for managing users.
*/

import React, { Component } from "react"; 
import "./index.css";
import axios from "axios";
import "../../notification-sender/notification-sender.jsx"; 
import { sendNotifications } from "../../notification-sender/notification-sender.jsx"; 

class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }

    // Fetch user data from the server when the component mounts
    async componentDidMount() {
        try {
            // Make a GET request to fetch user data from the server
            const response = await axios.get('http://localhost:8080/admin/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization token in the request header
                }
            });

            // Process and structure the fetched user data
            const user_data = []
            for(let i = 0; i < response.data.userList.length; i++) {
                if (response.data.userList[i].name !== "admin") { // Manage users should not include admin users
                    user_data.push({
                        id: response.data.userList[i].id,
                        name: response.data.userList[i].name,
                        username: response.data.userList[i].username,
                        email: response.data.userList[i].email,
                        number: response.data.userList[i].phoneNumber,
                        active: response.data.userList[i].active,
                        user: response.data.userList[i]
                    });
                }
            }

            // Update component state with the processed user data
            this.setState({ userData: user_data });

        } catch (error) {
            alert("Unable to get user data");
        }
    }

    // Function to delete a user
    deleteUser = async (index, active, user) => {  
        try {
            // Make a POST request to change user details (status) on the server
            await axios.post('http://localhost:8080/user/change-details', {
                userId: user.id,
                active: !active, // Toggle user status
                type: "STATUS"
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization token in the request header
                }
            });

            // Filter out the deleted user from the user data
            const updateUserData = this.state.userData.filter((item) => item.id !== user.id);
            this.setState({ userData: updateUserData });
            
            // Update user status in the component state
            const dupUserData = this.state.userData;
            dupUserData[index].active = !active;
            this.setState({ userData: dupUserData });

            // Send notification to the user based on their status
            if (active) {
                sendNotifications(user, "Mature Missions: Deactived Account", "Your accounts has been deactivated. Please contact the admin to re-activate your account.");
            }

            window.location.reload();

        } catch (error) {
            alert("Unable to deactivate user"); // Alert errors to admins if any occur during data fetching
        }
    };

    render() {
        return (
            <div className="manage-users-table">
                <span><p>Manage Users</p></span>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through user data and display in table rows */}
                        {this.state.userData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.number}</td>
                                {/* Display user status */}
                                { item.active.toString() === "false" && <td>Deactivated</td> }
                                { item.active.toString() === "true" && <td>Activated</td> }
                                {/* Render appropriate action button based on user status */}
                                <td>
                                    { item.active && <button className="btn btn-danger delete-button" onClick={() => this.deleteUser(index, item.active, item.user)}>Deactivate</button> }
                                    { !item.active && <button className="btn btn-success delete-button" onClick={() => this.deleteUser(index, item.active, item.user)}>Activate</button> }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ManageUsers;
