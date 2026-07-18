import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Key } from 'lucide-react';
import styles from '../styles/Admin.module.css';

export default function AdminLogin({ handleLogin, password, setPassword, status, onBack }) {
  return (
    <div className={styles.adminPageWrapper}>
      
      {/* Background Decorative Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={styles.loginCard}
      >
        <button onClick={onBack} className={styles.backBtn}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className={styles.loginHeaderFlex}>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className={styles.loginIconBox}
          >
            <Shield size={32} />
          </motion.div>
          <h2 className={styles.loginTitle}>Admin Login</h2>
          <p className={styles.loginSubtitle}>Secure access to the knowledge base</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputIcon}>
              <Key size={18} />
            </div>
            <input
              type="password"
              className={styles.loginInput}
              placeholder="Enter admin password (admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {status && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={styles.statusMessage}>
              {status}
            </motion.div>
          )}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className={styles.submitBtn}
          >
            Authenticate
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
