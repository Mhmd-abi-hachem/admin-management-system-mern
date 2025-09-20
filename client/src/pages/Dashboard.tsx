import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../shared/ui/Heading/Heading";
import Row from "../shared/ui/Row/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
