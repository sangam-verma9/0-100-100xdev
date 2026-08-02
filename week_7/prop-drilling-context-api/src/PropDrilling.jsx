function App() {
    const username = "Rahul";

    return <Dashboard username={username} />;
}

function Dashboard({ username }) {
    return <Profile username={username} />;
}

function Profile({ username }) {
    return <UserName username={username} />;
}

function UserName({ username }) {
    return <h1>Hello, {username}</h1>;
}

export default App;