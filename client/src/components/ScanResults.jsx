import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

const data = [
  { name: 'Critical', value: 0, color: '#ef4444', icon: ShieldAlert },
  { name: 'High', value: 3, color: '#f97316', icon: AlertTriangle },
  { name: 'Medium', value: 12, color: '#f59e0b', icon: AlertCircle },
  { name: 'Low', value: 24, color: '#3b82f6', icon: Info },
];

export default function ScanResults() {
  const totalVulns = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="grid-cols-3">
      {/* Chart Panel */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert color="var(--primary)" />
          Vulnerability Breakdown
        </h3>
        <div style={{ flex: 1, minHeight: '250px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--panel-bg)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(8px)'
                }} 
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{totalVulns}</span>
            <br />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: 'span 2' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Scan Overview</h3>
            <p>Trivy Image Scan completed successfully. Found {totalVulns} vulnerabilities.</p>
          </div>
          <span className="badge badge-warning">Action Required</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', flex: 1 }}>
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.name}
                className="glass-card" 
                style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: `${item.color}20`, 
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{item.name} Severity</h4>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{item.value}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
