import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Welcome 🎯</h1>
        <p>You are logged in successfully.</p>
      </div>
    </>
  );
}
