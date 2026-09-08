import PageTitle from "../../components/ui/PageTitle";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

function Home() {
  const handleClick = () => {
    alert("Welcome to the Inventory Management System!");
  };

  return (
    <div className="page">
      <PageTitle>Home Page</PageTitle>

      <Card
        title="Inventory Management System"
        description="Manage products, suppliers, inventory and purchase orders in one place."
      >
        <Button onClick={handleClick}>
          Get Started
        </Button>
      </Card>
    </div>
  );
}

export default Home;