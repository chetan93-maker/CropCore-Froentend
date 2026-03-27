export default function Profile() {
  const farmer = JSON.parse(localStorage.getItem("farmer"));

  return (
    <div className="container">
      <h1>👨‍🌾 Farmer Profile</h1>

      <div className="card">
        <p><b>Name:</b> {farmer?.name}</p>
        <p><b>Email:</b> {farmer?.email}</p>
        <p><b>Mobile:</b> {farmer?.mobile}</p>
      </div>
    </div>
  );
}