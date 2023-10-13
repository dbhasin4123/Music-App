import { Link } from "react-router-dom";

export default function NewSample() {
    return (
        <div className="box greyed center">
            <Link to="edit/new" className="secondary">Create Sample</Link>
        </div>
    );
}
