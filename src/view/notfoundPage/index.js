import React from "react";
import error404 from "./error-404-monochrome.svg";
import { Link } from "react-router-dom";
function notfoundPage() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="text-center mt-4">
              <img alt="Error 404" className="mb-4 img-error" src={error404} />
              <p className="lead">A pagina solicitada não existe.</p>
              <Link to="/">
                <i className="fas fa-arrow-left mr-1"></i> Retornar
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="layoutError_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">Copyright &copy; Spx Events 2020</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default notfoundPage;
