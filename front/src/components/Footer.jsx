const Footer = () => {
    return(
      <div className="footer p-2">
          <div className="container">
              <div className="row">
                  <div className="col-md-7">
                  </div>
                  <div className="col-md-5">
                      <div className="footer-menu">
                            <ul>
                                <li className="title-follow">Suivez-nous </li>
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-pinterest-p"></i></a></li>
                                <li><a href="#"><i className="fas fa-envelope"></i></a></li>
                                <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                            </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default Footer;