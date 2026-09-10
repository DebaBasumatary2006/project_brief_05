import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Dashboard() {
  const handleClick = () => {
    alert("Dashboard button clicked!");
  };

  return (
    <div className="page">
      <PageTitle>Dashboard</PageTitle>

      <div className="card-grid">
        <Card
          title="Total Products"
          description="Number of products in inventory."
        >
          <h2>0</h2>
        </Card>

        <Card
          title="Total Suppliers"
          description="Number of registered suppliers."
        >
          <h2>0</h2>
        </Card>

        <Card
          title="Pending Orders"
          description="Purchase orders waiting for processing."
        >
          <h2>0</h2>
        </Card>

        <Card
          title="Inventory"
          description="Manage your current stock."
        >
          <Button onClick={handleClick}>
            View Inventory
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;