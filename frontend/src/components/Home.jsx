import React, { useEffect } from "react"
import AOS from "aos"
import 'aos/dist/aos.css';

import styles from "../stylesheets/Home.module.css"
import navb from "../stylesheets/Navbar.module.css"

import Typewriter from "typewriter-effect"
import { useNavigate } from "react-router-dom"

import step1 from "../assets/step1.png"
import step3 from "../assets/step3.png"
import step2 from "../assets/step2.png"

const Home = () => {
    let navigate = useNavigate()

    const func1 = (e) => {
        navigate("/dashboard")
    }

    const func2 = (e) => {
        navigate("/login")
    }

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <>
            <div className={styles.desktop}>
                <nav className={navb.navbar}>
                        <button className={`${styles.buttons} ${navb.buttonhome}`} onClick={func1}>Dashboard</button>
                        <button className={`${styles.buttons} ${navb.buttonhome}`}onClick={func2}>NGO Login</button>
                </nav>

                <div className={styles.container}>
                    <div className={styles.headings}>
                        <div>
                            <p className={styles.title}>
                                <Typewriter
                                    options={{
                                        strings: ["Charity Insights"],
                                        autoStart: true,
                                        deleteSpeed: Infinity,
                                    }}
                                />
                            </p>
                            <p className={styles.tagline}>
                                Beyond Charity, Embracing Change:<br /> Charity Insight - Where Insights Fuel Transformative Giving.
                            </p>
                        </div>
                    </div>

                    <div className={styles.aboutdiv}>
                        <p data-aos="fade-zoom-in" data-aos-duration="1000" data-aos-delay="200" className={styles.aboutus}>About Us</p>

                        <p data-aos="fade-zoom-in" data-aos-duration="1000" data-aos-delay="700" className={styles.abouttxt}>
                            Welcome to Charity Insight, where compassion meets data to create a powerful force for positive change. At Charity Insight, we believe in the transformative potential of every act of generosity. Our platform serves as a bridge between those who wish to make a difference and the NGOs dedicated to creating a better world.

                        </p>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <div className={styles.aboutdiv}>
                        <p data-aos="fade-zoom-in" data-aos-duration="1000" data-aos-delay="800" className={styles.aboutus}>Our Mission</p>

                        <p data-aos="fade-zoom-in" data-aos-duration="1000" data-aos-delay="1300" className={styles.abouttxt}>
                            Empowering Change, Illuminating Impact.<br />

                            Our mission is to inspire and facilitate meaningful connections between donors and NGOs, fostering a global community committed to positive change. We believe in the collective power of informed giving and the invaluable insights that data can provide to amplify the impact of charitable actions.
                        </p>
                    </div>

                    <div data-aos="fade-zoom-in" data-aos-duration="1000" data-aos-delay="700" className={styles.stepsheading}>
                        <p className={styles.testedtxt}>Donate</p>
                        <p className={styles.steps}>In 3 Simple Steps</p>
                    </div>

                    <div className={styles.stepsdiv} data-aos="fade-zoom-in" data-aos-duration="1000" data-aos-delay="700">
                        <div className={styles.stepparent}>

                            <img
                                src={step1}
                                alt="Eye Scanner"
                                className={styles.img}
                            />

                            <p className={styles.steptxt}>
                                Select a NGO of your choice.
                            </p>
                        </div>

                        <div className={styles.stepparent}>

                            <img
                                src={step2}
                                alt="Upload Image"
                                className={styles.img2}
                            />

                            <p className={styles.steptxt}>
                                Fill in your details and decide the amount you wish to donate.
                            </p>
                        </div>

                        <div className={styles.stepparent}>

                            <img
                                src={step3}
                                alt="Upload Image"
                                className={styles.img2}
                            />

                            <p className={styles.steptxt}>
                                Select from multitude of different payment  options. Be the change you wish to see in the world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.mobile}>
                <nav className={navb.navbar}>
                    {localStorage.getItem("Token") ? (
                        <button
                            className={`${styles.buttons} ${navb.buttonhome}`}
                            onClick={func1}
                        >
                            Dashboard
                        </button>
                    ) : (
                        <button
                            className={`${styles.buttons} ${navb.buttonhome}`}
                            onClick={func2}
                        >
                            Get Started
                        </button>
                    )}
                </nav>

                <div className={styles.container}>
                    <div className={styles.headings}>
                        <div>
                            <p className={styles.title}>
                                <Typewriter
                                    options={{
                                        strings: ["Charity Insights"],
                                        autoStart: true,
                                        deleteSpeed: Infinity,
                                    }}
                                />
                            </p>
                            <p className={styles.tagline}>
                                Beyond Charity, Embracing Change:<br /> Charity Insight - Where Insights Fuel Transformative Giving.
                            </p>
                        </div>
                    </div>

                    <div data-aos="fade-zoom-in" data-aos-duration="1000" className={styles.aboutdiv}>
                        <p className={styles.aboutus}>About Us</p>

                        <p className={styles.abouttxt}>
                            Welcome to Charity Insight, where compassion meets data to create a powerful force for positive change. At Charity Insight, we believe in the transformative potential of every act of generosity. Our platform serves as a bridge between those who wish to make a difference and the NGOs dedicated to creating a better world.
                        </p>
                    </div>
                    
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <div data-aos="fade-zoom-in" data-aos-duration="1000" className={styles.aboutdiv}>
                        <p className={styles.aboutus}>Our Mission</p>

                        <p className={styles.abouttxt}>
                            Empowering Change, Illuminating Impact.<br />

                            Our mission is to inspire and facilitate meaningful connections between donors and NGOs, fostering a global community committed to positive change. We believe in the collective power of informed giving and the invaluable insights that data can provide to amplify the impact of charitable actions.
                        </p>
                    </div>


                    <div data-aos="fade-zoom-in" data-aos-duration="1000" className={styles.stepsheading}>
                        <p className={styles.testedtxt}>Donate</p>
                        <p className={styles.steps}>In 3 Simple Steps</p>
                    </div>

                    <div className={styles.stepsdiv}>
                        <div className={styles.stepparent} data-aos="fade-right" data-aos-duration="1000">

                            <img
                                src={step1}
                                alt="Eye Scanner"
                                className={styles.img}
                            />

                            <p className={styles.steptxt}>
                                Select a NGO of your choice.
                            </p>
                        </div>

                        <div className={styles.stepparent} data-aos="fade-left" data-aos-duration="1000">

                            <img
                                src={step2}
                                alt="Upload Image"
                                className={styles.img2}
                            />

                            <p className={styles.steptxt}>
                                Fill in your details and decide the amount you wish to donate.
                            </p>
                        </div>

                        <div className={styles.stepparent} data-aos="fade-right" data-aos-duration="1000">

                            <img
                                src={step3}
                                alt="Upload Image"
                                className={styles.img2}
                            />

                            <p className={styles.steptxt}>
                                Select from multitude of different payment  options. Be the change you wish to see in the world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
