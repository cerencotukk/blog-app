import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((err) => {
        alert("Error: " + err);
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500">Hello World</h1>

      <form onSubmit={login}>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
