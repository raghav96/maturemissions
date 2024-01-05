/**
 * File: App.js
 * Description: Sets up routing for different pages/components using React Router.
 */

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Guest,
  Caregiver,
  Elderly,
  ServiceDescription,
  Pricing,
  About,
  TermsAndConditions,
  Login,
  Register,
  Payment,
  PaymentSuccess,
  PaymentFailure,
  ServicesRequest,
  Notifications,
  Profile,
  AdminLogin,
  AdminPanel,
  AccountFailure
} from "./screen";

import React from 'react';
import { SubscriptionProvider } from './SubscriptionContext';
import AccountSuccess from './screen/AccountSuccess';

function App() {

    // Components for different routes.
  const guest = <Guest />
  const caregiver = <Caregiver />
  const elderly = <Elderly />
  const pricing = <Pricing />
  const about = <About />
  const termsAndConditions = <TermsAndConditions />
  const login = <Login />
  const register = <Register />
  const payment = <Payment />
  const servicesRequest = <ServicesRequest />
  const adminLogin = <AdminLogin />
  const paymentSuccess = <PaymentSuccess/>
  const paymentFailure = <PaymentFailure/>
  const accountSuccess = <AccountSuccess/>
  const accountFailure = <AccountFailure/>

  return (
    <>
      <Router>
        <SubscriptionProvider>
          <Routes>
            <Route path="/" element={guest} />
            <Route path="/caregiver" element={caregiver} />
            <Route path="/elderly" element={elderly} />
            <Route path="/services/care-assistance" element={<ServiceDescription serviceName={"care-assistance"} />} />
            <Route path="/services/meal-preparation" element={<ServiceDescription serviceName={"meal-preparation"} />} />
            <Route path="/services/housekeeping" element={<ServiceDescription serviceName={"housekeeping"} />} />
            <Route path="/services/family-interaction" element={<ServiceDescription serviceName={"family-interaction"} />} />
            <Route path="/services/mobility-support" element={<ServiceDescription serviceName={"mobility-support"} />} />
            <Route path="/services/social-outgoings" element={<ServiceDescription serviceName={"social-outgoings"} />} />
            <Route path="/pricing" element={pricing} />
            <Route path="/about" element={about} />
            <Route path="/terms-and-conditions" element={termsAndConditions} />
            <Route path="/login" element={login} />
            <Route path="/register" element={register} />
            
            { localStorage.getItem('userRole') !== null &&
              <>
                <Route path="/payment" element={payment} />
                <Route path="/success" element={paymentSuccess} />
                <Route path="/failure" element={paymentFailure} />
                <Route path="/account-success" element={accountSuccess} />
                <Route path="/account-failure" element={accountFailure} />
                <Route path="/services-request" element={servicesRequest} />
                <Route path="/caregiver/notifications" element={<Notifications userType="caregiver" />} />
                <Route path="/caregiver/notifications/care-assistance" element={<Notifications userType="caregiver" serviceName={"care-assistance"} />} />
                <Route path="/caregiver/notifications/meal-preparation" element={<Notifications userType="caregiver" serviceName={"meal-preparation"} />} />
                <Route path="/caregiver/notifications/housekeeping" element={<Notifications userType="caregiver" serviceName={"housekeeping"} />} />
                <Route path="/caregiver/notifications/family-interaction" element={<Notifications userType="caregiver" serviceName={"family-interaction"} />} />
                <Route path="/caregiver/notifications/mobility-support" element={<Notifications userType="caregiver" serviceName={"mobility-support"} />} />
                <Route path="/caregiver/notifications/social-outgoings" element={<Notifications userType="caregiver" serviceName={"social-outgoings"} />} />
                <Route path="/elderly/notifications" element={<Notifications userType="elderly" />} />
                <Route path="/caregiver/profile" element={<Profile userType="caregiver" />} />
                <Route path="/elderly/profile" element={<Profile userType="elderly" />} />
              </>
            }
              
            {/* Admin Route */}
            <Route path="/admin/login" element={adminLogin} />
            <Route path="/admin" element={<AdminPanel userType="admin" isItemClicked="false" />} />
            <Route path="/admin/manage-users" element={<AdminPanel userType="admin" isItemClicked="true" itemIndex={0} />} />
            <Route path="/admin/view-payments" element={<AdminPanel userType="admin" isItemClicked="true" itemIndex={1} />} />
            <Route path="/admin/reported-services" element={<AdminPanel userType="admin" isItemClicked="true" itemIndex={2} />} />
            <Route path="/admin/view-service-requests" element={<AdminPanel userType="admin" isItemClicked="true" itemIndex={3} />} />


          </Routes>
        </SubscriptionProvider>
      </Router>
    </>
  );
}

export default App;
