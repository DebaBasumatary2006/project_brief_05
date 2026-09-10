import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";

function NotFound() {
  return (
    <div className="page">
      <PageTitle>404 - Page Not Found</PageTitle>

      <div className="card-grid">
        <Card
          title="Page Not Found"
          description="Sorry, the page you are looking for does not exist."
        />
      </div>
    </div>
  );
}

export default NotFound;