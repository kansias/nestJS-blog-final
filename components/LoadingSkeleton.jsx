// import { Spinner } from "react-bootstrap";

export default function LoadingSkeleton() {
  return (
    <main>
      <div className="container d-flex justify-content-center align-items-center vh-100 ">
        <span className="spinner-border text-primary" role="status">
          {" "}
          loading...
        </span>
      </div>
    </main>
  );
}
