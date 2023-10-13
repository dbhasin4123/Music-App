import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../css/header.css";

export default function Header({ home }) {
    return (
        <header>
            <Link to="/">
                {!home && <FontAwesomeIcon icon={faArrowLeft} />}
                <h1 className="logo">
                    SongTrax
                </h1>
            </Link>

            <p>Create &amp; Share Samples, Listen in Mobile App!</p>
        </header >
    );
}
