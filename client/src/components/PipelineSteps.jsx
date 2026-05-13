import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Settings, ShieldCheck, Box } from 'lucide-react';

const steps = [
  { id: 1, name: 'Source', icon: GitCommit, status: 'success', description: 'GitHub Repository' },
  { id: 2, name: 'Build', icon: Settings, status: 'success', description: 'Docker Build' },
  { id: 3, name: 'Scan', icon: ShieldCheck, status: 'warning', description: 'Trivy Compliance' },
  { id: 4, name: 'Deploy', icon: Box, status: 'pending', description: 'Amazon ECR' },
];

export default function PipelineSteps() {
  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Settings className="animate-spin-slow" size={24} color="var(--primary)" />
        Pipeline Status
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        {/* Connecting line */}
        <div style={{ 
          position: 'absolute', 
          top: '24px', 
          left: '10%', 
          right: '10%', 
          height: '2px', 
          background: 'var(--border-color)',
          zIndex: 0
        }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '66%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ height: '100%', background: 'var(--primary)' }}
          />
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          let color = 'var(--text-muted)';
          let bg = 'var(--panel-bg)';
          let border = 'var(--border-color)';
          
          if (step.status === 'success') {
            color = 'var(--success)';
            bg = 'var(--success-bg)';
            border = 'var(--success)';
          } else if (step.status === 'warning') {
            color = 'var(--warning)';
            bg = 'var(--warning-bg)';
            border = 'var(--warning)';
          } else if (step.status === 'danger') {
            color = 'var(--danger)';
            bg = 'var(--danger-bg)';
            border = 'var(--danger)';
          }

          return (
            <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '25%' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, type: 'spring', stiffness: 200 }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: bg,
                  border: `2px solid ${border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: color,
                  boxShadow: step.status === 'warning' ? '0 0 15px var(--warning-glow)' : 'none'
                }}
              >
                <Icon size={24} />
              </motion.div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{step.name}</h3>
              <p style={{ fontSize: '0.875rem', textAlign: 'center' }}>{step.description}</p>
              
              <div style={{ marginTop: '0.5rem' }}>
                {step.status === 'success' && <span className="badge badge-success">Passed</span>}
                {step.status === 'warning' && <span className="badge badge-warning">Issues Found</span>}
                {step.status === 'danger' && <span className="badge badge-danger">Failed</span>}
                {step.status === 'pending' && <span className="badge" style={{ background: 'var(--border-color)' }}>Pending</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
