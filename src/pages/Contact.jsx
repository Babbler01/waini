import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);


  // ========================================
  // HANDLE INPUT
  // ========================================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    if (submitted) {
      setSubmitted(false);
    }
  }


  // ========================================
  // HANDLE SUBMIT
  // ========================================

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  }


  return (
    <main className="contact-page">

      {/* ========================================
          HERO
      ======================================== */}

      <section className="contact-hero">

        <div className="container">

          <div className="contact-hero-top">

            <p className="section-label">
              Contact
            </p>

            <span>
              Waini
            </span>

          </div>


          <div className="contact-hero-content">

            <h1>
              Let's talk
              <span> wine.</span>
            </h1>

            <p>
              Questions about your order, delivery,
              our collection or anything Waini?
              Send us a message.
            </p>

          </div>

        </div>

      </section>


      {/* ========================================
          CONTACT CONTENT
      ======================================== */}

      <section className="contact-main">

        <div className="container">

          <div className="contact-layout">


            {/* ====================================
                CONTACT INFORMATION
            ==================================== */}

            <div className="contact-information">

              <div className="contact-section-heading">

                <span>01</span>

                <div>
                  <p className="section-label">
                    Get In Touch
                  </p>

                  <h2>
                    We're here to
                    help.
                  </h2>
                </div>

              </div>


              <div className="contact-details">

                <div className="contact-detail">

                  <span>
                    01
                  </span>

                  <div>
                    <p>
                      Email
                    </p>

                    <a href="mailto:hello@waini.com">
                      hello@waini.com
                    </a>
                  </div>

                </div>


                <div className="contact-detail">

                  <span>
                    02
                  </span>

                  <div>
                    <p>
                      Customer Support
                    </p>

                    <strong>
                      Orders & Delivery
                    </strong>
                  </div>

                </div>


                <div className="contact-detail">

                  <span>
                    03
                  </span>

                  <div>
                    <p>
                      Wine Questions
                    </p>

                    <Link to="/assistant">
                      Ask Waini
                      <span>↗</span>
                    </Link>
                  </div>

                </div>

              </div>

            </div>


            {/* ====================================
                CONTACT FORM
            ==================================== */}

            <div className="contact-form-wrapper">

              <div className="contact-form-header">

                <p className="section-label">
                  Send A Message
                </p>

                <span>
                  02
                </span>

              </div>


              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                <div className="contact-form-row">

                  <div className="contact-field">

                    <label htmlFor="name">
                      Your Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="contact-field">

                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                <div className="contact-field">

                  <label htmlFor="subject">
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="What can we help with?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="contact-field">

                  <label htmlFor="message">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="7"
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>


                <button
                  type="submit"
                  className="contact-submit"
                >
                  <span>
                    Send Message
                  </span>

                  <span>
                    →
                  </span>
                </button>


                {submitted && (

                  <div className="contact-success">

                    <span>
                      ✓
                    </span>

                    <div>
                      <strong>
                        Message received.
                      </strong>

                      <p>
                        Thanks for getting in touch.
                      </p>
                    </div>

                  </div>

                )}

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          AI ASSISTANT CTA
      ======================================== */}

      <section className="contact-assistant">

        <div className="container">

          <div className="contact-assistant-inner">

            <div>

              <p className="section-label">
                Need Wine Advice?
              </p>

              <h2>
                Skip the form.
                <span> Ask Waini.</span>
              </h2>

            </div>


            <div className="contact-assistant-content">

              <p>
                Looking for a recommendation, food
                pairing or help choosing between
                bottles? Our AI Wine Assistant can
                help instantly.
              </p>

              <Link
                to="/assistant"
                className="btn btn-primary"
              >
                Open Wine Assistant
                <span>↗</span>
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;