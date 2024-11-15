import { Link } from "react-router-dom";
import Button from "../components/elements/Button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold">Welcome to Rumbia</h1>
      <p className="text-lg mt-4">The best place to find your dream job</p>
      <div className="flex gap-4 mt-4">
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>
        <Link to="/register">
          <Button
            variant="outline"
            size="medium"
            className="text-slate-800 border-slate-800"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
