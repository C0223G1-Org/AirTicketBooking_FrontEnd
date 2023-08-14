import { Link } from "react-router-dom/dist";

export default function HomePage() {
  return (
    <>
      <Link to={"/tickets/search-ticket"}>Search</Link>
    </>
  );
}
