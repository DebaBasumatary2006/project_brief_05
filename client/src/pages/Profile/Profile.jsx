import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Profile() {
  const handleClick = () => {
    alert("Profile button clicked!");
  };

  return (
    <div className="page">
      <PageTitle>Profile</PageTitle>

      <Card
        title="User Profile"
        description="Manage your profile information."
      >
        <p>
          Name: Inventory User
        </p>

        <p>
          Role: Staff
        </p>

        <Button onClick={handleClick}>
          Edit Profile
        </Button>
      </Card>
    </div>
  );
}

export default Profile;