import { useParams } from "react-router-dom";

export default function User() {
    const { id } = useParams();

    return (
        <>
            <h1>User Profile</h1>
            <p>User ID: {id}</p>
        </>
    );
}