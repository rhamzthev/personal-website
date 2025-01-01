/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./About.module.scss";
import Panel from "./Panel";
import Typewriter from 'typewriter-effect';

const About = () => {
    return (
        <Panel id="about">
            <div className={styles.aboutContainer}>
                <div className={styles.about}>
                    <div className={styles.photoContainer}>
                        <div className={styles.photo}>
                            {/* <img className={styles.subtract} alt="Design" src="about.svg" /> */}
                            <img className={styles.image} alt="Business Portrait" src="about.png" />
                            <div className={styles.design} />
                        </div>
                    </div>
                    <div className={styles.textContainer}>
                        <div className={styles.text}>

                            <div className={styles.subtitleContainer}>
                                <div className={styles.subtitle}>I&apos;m a</div>
                            </div>

                            <div className={styles.titleContainer}>
                                <div className={styles.title}>
                                    <Typewriter
                                        options={{
                                            strings: ['Software Engineer', 'Web Developer', 'Content Creator', 'Musician', 'Grappler'],
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={styles.contentContainer}>
                                <div className={styles.content}>
                                    I&apos;ll be graduating with a Software Engineering BS from RIT in 2025.
                                    I got my start as a freelancer for <a href="https://www.midnightmansion.com/">Midnight Mansion</a>, where I built front-end websites.
                                    <br />
                                    <br />
                                    During my Co-op at <a href="https://www.idibilling.com/">IDI Billing Solutions</a>,
                                    I was part of the team that worked on the backend of <a href="https://www.idibilling.com/costguard/">CostGuard</a>, an award-winning application.
                                    <br />
                                    <br />
                                    Beyond coding, I&apos;m a trumpet-playing musician and a fan of grappling sports like wrestling and Brazilian jiu-jitsu.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Panel>
    );
};

export default About
