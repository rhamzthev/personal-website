/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Experience.module.scss";
import Panel from "./Panel";

const exps = [
  {
    title: "Rhed",
    date: "Dev. 2024 - Present",
    content:
      "I'm currently building my personal brand, and this is one of the artifacts that came with it. I will be live streaming myself doing all things tech.",
    image: "/projects/rhed.jpg",
    link: "https://rhed.rhamzthev.com/",
  },
  {
    title: "Terre Website",
    date: "Aug. 2024 - Sep. 2024",
    content:
      "I have this idea of creating an Earth with a timeline, and based on the time and day you go to, It will show all major occuring events during that time. This is what I want Terre to be. This is a WIP.",
    image: "/projects/terre.jpg",
    link: "https://github.com/rhamzthev/terre",
  },
  {
    title: "Midnight Mansion Website(s)",
    date: "Dec. 2022 - Dec. 2022",
    content:
      "For the winter break, I helped with creating websites for Midnight Mansion. These websites would include the launch website that's shown here, as well as a business-facing website.",
    image: "/projects/midnightmansion.jpg",
    link: "https://www.midnightmansion.com/",
  },
  {
    title: "MIT 2.009 2022 Final Presentation Website",
    date: "Nov. 2022 - Dec. 2022",
    content:
      "Following the 2022 fall semester, a final presentation event was held to showcase the products made by the class, and this was the website that housed all the information regarding it. I was responsible for creating some of the pages on this website.",
    image: "/projects/2009fp.jpg",
    link: "https://www.009move.com/",
  },
  {
    title: "MIT 2.009 2022 Website",
    date: "Sep. 2022 - Nov. 2022",
    content:
      "This project was worked on during the course of the 2022 fall semester. This was for a Product Engineering course from the Massachusetts Institute of Technology. My responsibility was to transform mockups into working code, as well as implementing an exisiting back-end into the website.",
    image: "/projects/2009.jpg",
    link: "https://2022.2009.mit.edu/",
  },
];

const Experience = () => {
  const [index, setIndex] = useState(0);

  const [exp, setExp] = useState(exps[index]);

  useEffect(() => {
    setExp(exps[index]);
  }, [index]);

  return (
    <Panel id="experience">
      <div className={styles.experienceContainer}>
        <div className={styles.experience}>
          <div className={styles.textContainer}>
            <div className={styles.text}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>{exp.title}</div>
              </div>
              <div className={styles.subtitleContainer}>
                <div className={styles.subtitle}>{exp.date}</div>
              </div>
              <div className={styles.contentContainer}>
                <p className={styles.content}>{exp.content}</p>
              </div>
            </div>
          </div>

          <div className={styles.photoContainer}>
            <div className={styles.photo}>
              <div
                className={styles.upContainer}
                onClick={() =>
                  setIndex((prev) =>
                    prev - 1 < 0 ? exps.length - 1 : prev - 1
                  )
                }
              >
                <img className={styles.up} alt="Vector" src="up.svg" />
              </div>
              <div className={styles.exampleContainer}>
                <Link className={styles.exampleLink} href={exp.link}>
                  <div className={styles.example}>
                    {/* <img className={styles.subtract} alt="Subtract" src="experience.svg" /> */}
                    <img className={styles.image} alt="Image" src={exp.image} />
                    <div className={styles.design} />
                  </div>
                </Link>
              </div>
              <div
                className={styles.downContainer}
                onClick={() => setIndex((prev) => (prev + 1) % exps.length)}
              >
                <img className={styles.down} alt="Vector" src="down.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Experience;
