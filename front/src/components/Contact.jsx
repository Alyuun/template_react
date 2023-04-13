import { Fragment, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../tools/constante.js";

const Contact = () => {
  
  const [contactMessage, setContactMessage] = useState({
    title : "",
    name : "",
    message : "",
    mail : ""
  });
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setContactMessage({...contactMessage, [name]: value});
  };
  
  const submit = (e) => {
    e.preventDefault();
    
    axios.post(`${BASE_URL}/contact`,{
      title : contactMessage.title,
      name : contactMessage.name,
      message : contactMessage.message,
      mail : contactMessage.mail
    })
    .then(res => {
      console.log(res);
      alert("Votre message a bien été envoyé");
    })
    .catch(err => console.log(err));
    };
  
  return (
    <Fragment>
      <section className="contact-page-section">
      	<div className="container">
      		<div className="sec-title">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86684.62084068525!2d-1.630373951981032!3d47.23821141089867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805ee81f0a8aead%3A0x40d37521e0ded30!2sNantes!5e0!3m2!1sfr!2sfr!4v1679920467001!5m2!1sfr!2sfr"
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              width="50%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>		
      			<h2>Contactez-nous</h2>
      		</div>
      		<div className="inner-container">
      			<div className="row clearfix">
      				<div className="form-column">
      					<div className="inner-column">
      						<div className="contact-form">
      							<form onSubmit = {submit} id="contact-form">
      								<div className="row clearfix">
      									<div className="form-group">
      									<input type="text" name="title" onChange = {handleChange}  placeholder="Titre" value = {contactMessage.title}/>
      									<input type="text" name="name" value = {contactMessage.name} onChange = {handleChange} placeholder="Votre nom"/>
      									<input type="email" name="mail" value = {contactMessage.mail} onChange = {handleChange} placeholder="Votre mail"/>      									
      										<textarea name="message" placeholder="Message" value = {contactMessage.message} onChange = {handleChange} ></textarea>
      									</div>
      									<div className="form-group">
      										<button type="submit" className="theme-btn">Envoyer</button>
      									</div>
      								</div>
      							</form>
      						</div>
      					</div>
      				</div>
      				<div className="info-column">
      					<div className="inner-column">
      						<h2>Informations de contact : </h2>
      						<ul className="list-info">
      							<li><i className="fas fa-address-card"></i>44 rue de Nantes, 44000 Nantes, France</li>
      							<li><i className="far fa-envelope"></i>travelia@travelia.com</li>
      							<li>
      							</li>
      						</ul>
      					</div>
      				</div>
      			</div>
      		</div>
      	</div>
      </section>
    </Fragment>
  );
};

export default Contact;
