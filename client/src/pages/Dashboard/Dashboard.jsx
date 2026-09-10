import { useState } from "react";

import PageTitle from "../../components/ui/PageTitle";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

function Dashboard() {

  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleAddNotification = () => {
    setCount(count + 1);
  };

  const handleLoginToggle = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div className="page">

      <PageTitle>
        Dashboard
      </PageTitle>

      <div className="card-grid">

        <Card
          title="Notification Count"
          description="Number of notifications."
        >
          <h2>{count}</h2>

          <Button onClick={handleAddNotification}>
            Add Notification
          </Button>
        </Card>

        <Card
          title="User Input"
          description="Enter your name below."
        >

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <p>
            Your name: {name || "Not entered"}
          </p>

        </Card>

        <Card
          title="Login Status"
          description="Current login status."
        >

          {loggedIn ? (
            <p>Welcome! You are logged in.</p>
          ) : (
            <p>Please login to continue.</p>
          )}

          <Button onClick={handleLoginToggle}>
            {loggedIn ? "Logout" : "Login"}
          </Button>

        </Card>

      </div>

    </div>
  );
}

export default Dashboard;