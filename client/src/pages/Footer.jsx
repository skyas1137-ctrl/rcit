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

                <p className="footerP">DCA / ADCA</p>
                <p className="footerP">O Level / A Level Training</p>
                <p className="footerP">Full-Stack Web Development (MERN)</p>
                <p className="footerP">Python & Data Science</p>
                <p className="footerP">Tally Prime & GST Training</p>
            </div>




            <div className="footerf">
            <h1 className="quick">Contact & Location Info</h1>

                <p className="footerP">Address: <span>Indupur</span></p>
                <p className="footerP">Phone Number: <span>Calling aur WhatsApp number.</span></p>
                <p className="footerP">Email: <span>official_email@rcit.com</span></p>
                <p className="footerP">Timing: <span>Mon - Sat: 8:00 AM - 7:00 PM</span></p>
            </div>
        </div>
    )
}

export default Footer