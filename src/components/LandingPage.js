'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import {
  Brain, FileText, MessageSquare, UploadCloud,
  Mic, Shield, Smartphone, Moon, ArrowRight,
  CheckSquare, Square, Volume2, Database
} from 'lucide-react';
import styles from '../styles/Landing.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.wrapper}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            TA
          </div>
          <h1 className={styles.logoText}>TruthAI</h1>
        </div>
        <div className={styles.navActions}>
          <button onClick={toggleTheme} className={`btn btn-icon ${styles.themeBtn}`}>
            {theme === 'dark' ? <Moon size={20} /> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>}
          </button>
          <Link href="/chat" className={`btn btn-primary ${styles.navLink}`}>
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeInUp} className={styles.badge}>
            ✨ The Future of Enterprise Search
          </motion.div>
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            Talk to your data with <br />
            <span className={styles.heroGradientText}>TruthAI Chatbot</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
            Upload your company documents and instantly get accurate, AI-generated answers. Powered by advanced RAG architecture.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/chat" className={`btn btn-primary ${styles.ctaBtn}`}>
              Try the Demo Now <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={styles.featuresGrid}
        >

          {/* Feature 1: RAG Architecture */}
          <FeatureCard title="RAG Architecture" icon={<Brain size={24} color="var(--primary-color)" />}>
            <div className={styles.cardInnerBlockFlex}>
              <div className={styles.flexCenterBetween}>
                <Database size={28} color="var(--text-secondary)" />
                <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ArrowRight size={20} color="var(--primary-color)" /></motion.div>
                <div className={styles.iconBoxPrimary}><Brain size={28} color="var(--primary-color)" /></div>
                <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}><ArrowRight size={20} color="var(--primary-color)" /></motion.div>
                <MessageSquare size={28} color="var(--success-color)" />
              </div>
              <p className={styles.textCenterSm}>Vector-based retrieval for high accuracy.</p>
            </div>
          </FeatureCard>

          {/* Feature 2: Ask from selected document */}
          <FeatureCard title="Filter by Document" icon={<FileText size={24} color="var(--primary-color)" />}>
            <div className={styles.cardInnerBlock}>
              <div className={styles.cardTitleSm}>Select Documents</div>
              <div className={styles.cardList}>
                <div className={styles.cardListItem}><CheckSquare size={16} color="var(--primary-color)" /> HR.pdf</div>
                <div className={styles.cardListItem}><CheckSquare size={16} color="var(--primary-color)" /> Policy.pdf</div>
                <div className={styles.cardListItemSecondary}><Square size={16} /> Finance.pdf</div>
              </div>
            </div>
          </FeatureCard>

          {/* Feature 3: Follow-up Questions */}
          <FeatureCard title="Follow-up Questions" icon={<MessageSquare size={24} color="var(--primary-color)" />}>
            <div className={styles.cardInnerBlock}>
              <div className={styles.cardTitleSm}>You may also ask:</div>
              <div className={styles.cardList}>
                <div className={styles.cardBox}>• Who approved this policy?</div>
                <div className={styles.cardBox}>• When was it updated?</div>
                <div className={styles.cardBox}>• Is it applicable to interns?</div>
              </div>
            </div>
          </FeatureCard>

          {/* Feature: Confidence Meter */}
          <FeatureCard title="Confidence Meter" icon={<Shield size={24} color="var(--success-color)" />}>
            <div className={styles.confidenceMeter}>
              <div className={styles.cardTitleXs}>Answer Confidence</div>
              <div className={styles.confidenceLevel}>
                <span className={styles.confidenceIcon}>🟢</span>
                <span className={styles.confidenceText}>High</span>
              </div>
              <div className={styles.confidenceValue}>92%</div>
            </div>
          </FeatureCard>

          {/* Feature: Chat Suggestions */}
          <FeatureCard title="Chat Suggestions" icon={<MessageSquare size={24} color="var(--primary-color)" />}>
            <div className={styles.cardInnerBlock}>
              <div className={styles.cardTitleXs}>Below input</div>
              <div className={styles.cardTitleSm}>Try asking</div>
              <div className={styles.cardList}>
                <div className={styles.cardBox}>• Summarize document</div>
                <div className={styles.cardBox}>• Compare two documents</div>
              </div>
            </div>
          </FeatureCard>

          {/* Feature 4: File Upload Experience */}
          <FeatureCard title="Seamless Uploads" icon={<UploadCloud size={24} color="var(--primary-color)" />}>
            <div className={styles.uploadContainer}>
              <UploadCloud size={32} color="var(--primary-color)" className={styles.uploadIcon} />
              <div className={styles.uploadTitle}>Drop PDF Here</div>
              <div className={styles.uploadProgressWrapper}>
                <div className={styles.uploadStatusText}>Uploading...</div>
                <div className={styles.progressBarContainer}>
                  <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity }} className={styles.progressBarFill} />
                </div>
                <div className={styles.uploadSubStatus}>
                  <span>Extracting Text...</span>
                  <span>Creating Embeddings...</span>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Feature 5: Voice Feature */}
          <FeatureCard title="Voice Assistant" icon={<Mic size={24} color="var(--primary-color)" />}>
            <div className={styles.voiceContainer}>
              <div className={styles.voiceItem}>
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className={styles.voiceMicOuter}>
                  <Mic size={24} />
                </motion.div>
                <div className={styles.voiceText}>Ask by Voice</div>
              </div>
              <div className={styles.voiceItem}>
                <div className={styles.voiceListenOuter}>
                  <Volume2 size={24} />
                </div>
                <div className={styles.voiceText}>Listen to Answer</div>
              </div>
            </div>
          </FeatureCard>

          {/* Feature 6: Admin Panel */}
          <FeatureCard title="Secure Admin Panel" icon={<Shield size={24} color="var(--primary-color)" />}>
            <div className={styles.cardInnerBlock}>
              <div className={styles.adminHeader}>
                <div className={styles.cardTitleSm} style={{ marginBottom: 0 }}>Admin Dashboard</div>
                <Shield size={16} color="var(--success-color)" />
              </div>
              <div className={styles.cardList}>
                <button className={`btn btn-secondary ${styles.adminBtnSmall}`}>View Documents</button>
                <button className={`btn ${styles.adminBtnDelete}`}>Delete Documents</button>
              </div>
            </div>
          </FeatureCard>

          {/* Feature 7: PWA */}
          <FeatureCard title="Mobile PWA Ready" icon={<Smartphone size={24} color="var(--primary-color)" />}>
            <div className={styles.pwaContainer}>
              <div className={styles.pwaPhone}>
                <div className={styles.pwaPhoneTop}></div>
                <div className={styles.pwaPhoneScreen}></div>
              </div>
              <div>
                <h4 className={styles.pwaTitle}>Install Anywhere</h4>
                <p className={styles.pwaDesc}>Works perfectly as a Progressive Web App on iOS and Android.</p>
              </div>
            </div>
          </FeatureCard>

          {/* Feature 8: Dark Mode */}
          <FeatureCard title="Native Dark Mode" icon={<Moon size={24} color="var(--primary-color)" />}>
            <div className={styles.themeDemo}>
              <div className={styles.themeLight}>Light</div>
              <div className={styles.themeDark}>Dark</div>
            </div>
          </FeatureCard>

        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2026 TruthAI Chatbot. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, icon, children }) {
  return (
    <motion.div variants={fadeInUp} className={styles.featureCard}>
      <div className={styles.featureCardHeader}>
        <div className={styles.featureCardIcon}>
          {icon}
        </div>
        <h3 className={styles.featureCardTitle}>{title}</h3>
      </div>
      <div className={styles.featureCardContent}>
        {children}
      </div>
    </motion.div>
  );
}
