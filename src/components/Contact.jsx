import React from 'react'
import Nav from './Nav'
import imgs from "./images/contact-img.svg";
import Footer from './Footer';
const Contact = () => {
    document.title="Contact Us | Land Vista";
    return (
        <>
            <Nav />
            <section class="contact">

                <div class="row">
                    <div class="image">
                        <img src={imgs} alt="" />
                    </div>
                    <form action="" method="post">
                        <h3>get in touch</h3>
                        <input type="text" name="name" required maxlength="50" placeholder="enter your name" class="box" />
                        <input type="email" name="email" required maxlength="50" placeholder="enter your email" class="box" />
                        <input type="number" name="number" required maxlength="10" max="9999999999" min="0" placeholder="enter your number" class="box" />
                        <textarea name="message" placeholder="enter your message" required maxlength="1000" cols="30" rows="10" class="box"></textarea>
                        <input type="submit" value="send message" name="send" class="btn" />
                    </form>
                </div>

                <div className="grid gap-6 px-6 pb-8 mt-8 text-center sm:grid-cols-3">
                    <div>
                        <h3 className="mb-2 text-xl font-semibold text-blue-500">Call us</h3>
                        <p><a href="tel:+919829055120">+91 98290 55120</a></p>
                        <p><a href="tel:+911412748830">+91 141 274 8830</a></p>
                        <p className="mt-2">Monday to Saturday, 10:00 AM – 7:00 PM</p>
                    </div>
                    <div>
                        <h3 className="mb-2 text-xl font-semibold text-blue-500">Email</h3>
                        <p><a href="mailto:hello@landvista.com">hello@landvista.com</a></p>
                    </div>
                    <div>
                        <h3 className="mb-2 text-xl font-semibold text-blue-500">Visit the office</h3>
                        <p>42, Malviya Nagar</p>
                        <p>Jaipur, Rajasthan 302017</p>
                    </div>
                </div>

            </section>
            <Footer />

        </>
    )
}

export default Contact
