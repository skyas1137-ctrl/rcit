import React from "react";

function Footer() {
    return (
        <div className="footerDiv" style={{ backgroundColor: "rgb(19, 19, 19)", color:"white"}}>
            <div className="footerf">
            <h1 className="quick">Quick Links (Navigation)</h1>

                <p className="footerP">Home</p>
                <p className="footerP">About Us</p>
                <p className="footerP">Our Courses</p>
                <p className="footerP">Gallery / Campus Life</p>
                <p className="footerP">Contact Us</p>
            </div>



            <div className="footerf">
            <h1 className="quick">Popular Courses</h1>

                <p className="footerP">CCC</p>
                <p className="footerP">DCA / ADCA</p>
                <p className="footerP">Tally Prime with GST</p>
                <p className="footerP">Ms Excel</p>
                <p className="footerP">Ms Word</p>
                <p className="footerP">Ms Power Point</p>
            </div>




            <div className="footerf">
            <h1 className="quick">Contact & Location Info</h1>

                <p className="footerP">Address: <span>Indupur</span></p>
                <p className="footerP">Phone Number: <span>9682255604</span></p>
                <p className="footerP">Email: <span>Rcitindupur@gmail.com</span></p>
                <p className="footerP">Timing: <span>Mon - Sat: 8:00 AM - 7:00 PM</span></p>
            </div>
        </div>
    )
}

export default Footer