import Head from "next/head";
import Landing from "../components/Landing";
import styles from "../styles/index.module.scss";
import Bar from "../components/Bar";
import Panel from "../components/Panel";
import { useCallback } from "react";
import About from "../components/About";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link";

export default function Index() {

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  return (
    <div>
      <Head>
        <title>Rhamsez Thevenin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <main className={styles.content}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "rgba(17, 17, 17, 1)",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 100,
                  duration: 0.1,
                },
              },
            },
            particles: {
              color: {
                value: "rgba(110, 10, 30, 1)",
              },
              links: {
                color: "rgba(110, 10, 30, 1)",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <Bar />
        <Landing />
        <About />
        <Experience />

        <div className={styles.contact} id="contact">
          <Contact />
        </div>

        <Link href="/resume">
          <div className={styles.FileLinesContnainer}>
            <FontAwesomeIcon className={styles.FileLines} icon={faFileLines} />
          </div>
        </Link>

      </main>
    </div>
  );
}
