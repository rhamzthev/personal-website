import styles from "./Contact.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Contact = () => {
    return (
        <div className={styles.ContactContainer}>
            <div className={styles.Contact}>
                <Link href="https://github.com/RhamzThev">
                    <div className={styles.GitHubContainer}>
                        <FontAwesomeIcon className={styles.GitHub} icon={faGithub} />
                    </div>
                </Link>

                <Link href="mailto:rhamzthev@gmail.com">
                    <div className={styles.EmailContainer}>
                        <FontAwesomeIcon className={styles.Email} icon={faEnvelope} />
                    </div>
                </Link>

                <Link href="https://www.linkedin.com/in/rhamzthev/">
                    <div className={styles.LinkedInContainer}>
                        <FontAwesomeIcon className={styles.LinkedIn} icon={faLinkedin} />
                    </div>
                </Link>

            </div>
            <div className={styles.CopyrightContainer}>
                <div className={styles.Copyright}>&copy; 2025 Rhamsez Thevenin</div>
            </div>
        </div>
    )
}

export default Contact