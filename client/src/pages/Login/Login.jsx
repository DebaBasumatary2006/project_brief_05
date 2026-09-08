import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Login() {
  const handleLogin = () => {
    alert("Login button clicked!");
  };

  return (
    <div className="page">
      <PageTitle>Login</PageTitle>

      <Card
        title="User Login"
        description="Login functionality will be implemented in a future sprint."
      >
        <Button onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
}

export default Login;