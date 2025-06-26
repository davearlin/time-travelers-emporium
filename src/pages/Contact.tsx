import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useTrackedToast } from '../hooks/useTrackedToast';
import type { ContactForm } from '../types';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const toast = useTrackedToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Message sent successfully! We\'ll respond within 24-48 temporal hours.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>Get in touch across any timeline - we're here to help with all your temporal artifact needs</p>
      </div>

      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <h2>Reach Out Across Time</h2>
          <p>
            Our customer service team operates across multiple timelines to ensure 
            we can assist you whenever and wherever you are in the space-time continuum.
          </p>

          <div className={styles.contactMethods}>
            <div className={styles.contactMethod}>
              <Mail className={styles.methodIcon} />
              <div>
                <h4>Temporal Email</h4>
                <p>support@timetravelers-emporium.temporal</p>
                <span>Response time: 24-48 temporal hours</span>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <Phone className={styles.methodIcon} />
              <div>
                <h4>Quantum Communication</h4>
                <p>+1 (555) TIME-001</p>
                <span>Available across all timelines</span>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <MapPin className={styles.methodIcon} />
              <div>
                <h4>Physical Locations</h4>
                <p>221B Temporal Street, London (1885)</p>
                <p>Future Plaza, Neo Tokyo (2387)</p>
                <span>Walk-ins welcome with temporal permits</span>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <Clock className={styles.methodIcon} />
              <div>
                <h4>Operating Hours</h4>
                <p>24/7 across all timelines</p>
                <span>Never closed due to temporal mechanics</span>
              </div>
            </div>
          </div>

          <div className={styles.emergencyContact}>
            <h3>Temporal Emergency?</h3>
            <p>
              If you're experiencing a paradox, timeline disruption, or artifact malfunction, 
              contact our emergency response team immediately:
            </p>
            <p className={styles.emergencyNumber}>
              Emergency Hotline: +1 (555) PARADOX
            </p>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="product-inquiry">Product Inquiry</option>
                <option value="order-status">Order Status</option>
                <option value="authentication">Authentication Question</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="temporal-issue">Temporal Issue</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Please describe your inquiry in detail..."
                rows={6}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Clock className={styles.spinning} size={20} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className={styles.formNote}>
            <p>
              * Required fields. All messages are encrypted using quantum-level security 
              and processed according to Temporal Privacy Guidelines.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4>How do I track my order across timelines?</h4>
            <p>
              Use our Quantum Tracking System with your order number. The tracking portal 
              automatically adjusts for temporal displacement and parallel timeline delivery.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h4>What if an artifact causes a paradox?</h4>
            <p>
              All our artifacts are paradox-proofed. However, if you experience any temporal 
              anomalies, contact our emergency team immediately for rapid timeline stabilization.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h4>Do you accept returns from the future?</h4>
            <p>
              Yes! Our return policy extends across all timelines. Future customers can return 
              items to any point in our operational timeline, including the past.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h4>How do I become a certified time traveler?</h4>
            <p>
              Visit the International Time Travel Bureau for certification. We offer discounts 
              to certified temporal merchants and licensed chrononauts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
