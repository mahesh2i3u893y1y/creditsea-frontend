import React from 'react';
// import NavbarVerifier from './NavbarVerifier';
import Sidebar from './sidebar';
import VerifierDashoard from './VerifierDashoard';
// import Navbar from './Navbar';
// import Navbar from "./Navbar"

function Admin() {
    const permissions = ["approved", "rejected"];
    return (
        <div className="h-screen">
            {/* Fixed Navbar */}
            {/* <div className="fixed top-0 left-0 w-full z-50 h-16">
                <Navbar />
            </div> */}
            {/* Main content below navbar */}
            <div className=" h-screen flex">
                {/* Sidebar - 30% */}
                <div className="w-[18%] h-full overflow-y-auto scrollbar-hide ">
                    <Sidebar />
                </div>

                {/* Dashboard - 70% */}
                <div className="w-[82%] h-full overflow-y-auto scrollbar-hide bg-gray-200 p-10">
                    <VerifierDashoard permissions={permissions} />
                </div>
            </div>
        </div>
    );
}

export default Admin;
