import React from 'react';
import PipelineSteps from './PipelineSteps';
import ScanResults from './ScanResults';
import { Shield, Activity, Clock, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <div className="container fade-in">
      <header className="flex-between mb-8">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '2rem' }}>
            <Shield size={32} color="var(--primary)" />
            SecOps Dashboard
          </h1>
          <p>Automated Container Compliance & CI/CD Pipeline</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--success)" />
            <span style={{ fontSize: '0.875rem' }}>System Online</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <Clock size={18} />
            <span style={{ fontSize: '0.875rem' }}>Last scan: 2 mins ago</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Scans', value: '1,284', trend: '+12%', color: 'var(--primary)' },
          { label: 'Images Protected', value: '42', trend: '+3', color: 'var(--success)' },
          { label: 'Avg Scan Time', value: '45s', trend: '-2s', color: 'var(--warning)' },
          { label: 'Active Clusters', value: '3', trend: 'Stable', color: 'var(--text-main)' }
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            className="glass-card" 
            style={{ padding: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>{stat.label}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{stat.value}</h3>
              <span style={{ fontSize: '0.875rem', color: stat.color }}>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <PipelineSteps />
      
      <ScanResults />
    </div>
  );
}
