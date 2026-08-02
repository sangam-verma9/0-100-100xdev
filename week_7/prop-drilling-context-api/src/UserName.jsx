import { useContext } from "react";
import { UserContext } from "./UserContext";

function UserName() {
    const user = useContext(UserContext);

    return <h1>Hello, {user.name}</h1>;
}
export default UserName;