import PageTitle from "../../components/ui/PageTitle";
import Welcome from "../../components/ui/Welcome";

function Home() {
  return (
    <div className="page">

      <PageTitle>
        Home Page
      </PageTitle>

      <Welcome
        name="Inventory User"
        project="Inventory Management System"
      />

    </div>
  );
}

export default Home;