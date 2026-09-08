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

      <Card
        title="Inventory Overview"
        description="View important inventory information from your dashboard."
      >
        <p>
          Total Products: 0
        </p>

        <p>
          Total Suppliers: 0
        </p>

        <p>
          Pending Orders: 0
        </p>

        <Button onClick={handleClick}>
          View Inventory
        </Button>
      </Card>
    </div>
  );
}

export default Dashboard;