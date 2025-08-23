import React from 'react';
import { Clock, Users, Shield, Zap } from 'lucide-react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>About Time Travelers' Emporium</h1>
        <p>Your trusted source for authentic temporal artifacts since 1885... and 2387.</p>
      </div>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Our Story</h2>
          <p>
            Founded by Dr. Chronos Temporal in 1885, Time Travelers' Emporium began as a small curiosity shop 
            in Victorian London. However, Dr. Temporal's groundbreaking discovery of stable time portals in 1887 
            transformed our humble shop into the multiverse's premier destination for temporal artifacts.
          </p>
          <p>
            Today, we operate across 47 different timelines, with our main headquarters existing simultaneously 
            in 1885, 2025, and 2387. Our team of expert chronoarchaeologists and temporal curators work 
            tirelessly to bring you the most fascinating and authentic artifacts from every era of human history... 
            and beyond.
          </p>
          <p>
            Whether you're looking for a genuine Roman gladius, a Victorian automaton, or a quantum computer 
            from the 23rd century, we have something to capture every temporal enthusiast's imagination.
          </p>
        </div>
        <div className={styles.timelineImage}>
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=400&fit=crop" 
            alt="Temporal laboratory"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=400&fit=crop';
            }}
          />
        </div>
      </section>

      <section className={styles.values}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <Shield className={styles.valueIcon} />
            <h3>Authenticity Guaranteed</h3>
            <p>
              Every artifact undergoes rigorous temporal authentication using our proprietary chronometer 
              technology. We guarantee the authenticity of every item or your money back across all timelines.
            </p>
          </div>
          <div className={styles.valueCard}>
            <Clock className={styles.valueIcon} />
            <h3>Temporal Responsibility</h3>
            <p>
              We adhere to the strict guidelines of the Intergalactic Temporal Ethics Council, ensuring 
              our collecting practices don't disrupt historical events or cause paradoxes.
            </p>
          </div>
          <div className={styles.valueCard}>
            <Users className={styles.valueIcon} />
            <h3>Expert Curation</h3>
            <p>
              Our team includes PhD historians, quantum archaeologists, and certified time travelers with 
              over 10,000 years of combined experience across all eras.
            </p>
          </div>
          <div className={styles.valueCard}>
            <Zap className={styles.valueIcon} />
            <h3>Innovation</h3>
            <p>
              We continuously invest in cutting-edge temporal technology to improve our artifact 
              preservation, authentication, and delivery methods across the space-time continuum.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                alt="Dr. Chronos Temporal"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
                }}
              />
            </div>
            <h4>Dr. Chronos Temporal</h4>
            <p>Founder & Chief Temporal Officer</p>
            <span>Active: 1885-Present (All Timelines)</span>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}>
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
                alt="Prof. Alexandria Quantum"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face';
                }}
              />
            </div>
            <h4>Prof. Alexandria Quantum</h4>
            <p>Head of Authentication</p>
            <span>Specializes in Medieval-Renaissance artifacts</span>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}>
              <img 
                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" 
                alt="Commander Zyx-9"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face';
                }}
              />
            </div>
            <h4>Commander Zyx-9</h4>
            <p>Future Artifacts Specialist</p>
            <span>From the year 2387, expert in quantum technology</span>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" 
                alt="Dr. Marcus Antiquus"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
                }}
              />
            </div>
            <h4>Dr. Marcus Antiquus</h4>
            <p>Ancient Civilizations Expert</p>
            <span>Specializes in Egyptian, Roman, and Mayan artifacts</span>
          </div>
        </div>
      </section>

      <section className={styles.certifications}>
        <h2>Certifications & Affiliations</h2>
        <div className={styles.certGrid}>
          <div className={styles.certification}>
            <h4>Temporal Ethics Council</h4>
            <p>Certified Member Since 1888</p>
          </div>
          <div className={styles.certification}>
            <h4>Galactic Archaeological Society</h4>
            <p>Premium Corporate Member</p>
          </div>
          <div className={styles.certification}>
            <h4>International Time Travel Bureau</h4>
            <p>Licensed Temporal Merchant</p>
          </div>
          <div className={styles.certification}>
            <h4>Quantum Authenticity Standards</h4>
            <p>QAS Level 9 Certification</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
