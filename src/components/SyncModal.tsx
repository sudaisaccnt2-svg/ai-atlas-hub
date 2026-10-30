import React, { useState } from 'react';
import { ProgressState } from '../types';
import {
  SyncConnectionStatus,
  getSupabaseConfig,
  saveSupabaseConfig,
  encodePortableBackup,
  decodePortableBackup,
} from '../lib/supabaseSync';
import { Icon } from './Icons';

interface SyncModalProps {
  progress: ProgressState;
  syncStatus: SyncConnectionStatus;
  isOnline: boolean;
  onClose: () => void;
  onUpdateLearnerKey: (newKey: string) => void;
  onImportProgress: (imported: ProgressState) => void;
  onReconnectSupabase: () => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  progress,
  syncStatus,
  isOnline,
  onClose,
  onUpdateLearnerKey,
  onImportProgress,
  onReconnectSupabase,
}) => {
  const existing = getSupabaseConfig();
  const [url, setUrl] = useState(existing?.url || '');
  const [anonKey, setAnonKey] = useState(existing?.anonKey || '');
  const [learnerInput, setLearnerInput] = useState(progress.learnerKey);
  const [backupInput, setBackupInput] = useState('');
  const [notice, setNotice] = useState('');

  const backupCode = encodePortableBackup(progress);

  const handleSaveCloud = () => {
    if (!url.trim() || !anonKey.trim()) {
      saveSupabaseConfig(null);
      setNotice('Cleared Supabase credentials. Saving locally in browser.');
      onReconnectSupabase();
      return;
    }
    saveSupabaseConfig({ url, anonKey });
    setNotice('Supabase configuration saved. Syncing progress...');
    onReconnectSupabase();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sync-modal" onClick={(e) => e.stopPropagation()}>
        <header className="drawer-head">
          <div>
            <h2>Device & Supabase Sync</h2>
            <span className="drawer-sub">
              Network: {isOnline ? 'Online' : 'Offline'} · Status: {syncStatus}
            </span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close sync settings">
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className="sync-sections">
          <div className="sync-block">
            <span className="sim-kicker">1. Supabase Cloud Sync (Optional Cross-Device Live Sync)</span>
            <p className="sync-help">
              Progress saves instantly in your browser automatically. Add your Supabase Project URL &amp; Anon Key (run{' '}
              <code>supabase/schema.sql</code> once) to sync live across phone, tablet, and PC.
            </p>
            <input
              type="url"
              placeholder="https://your-project.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              type="password"
              placeholder="Supabase public anon key"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
            />
            <div className="inline-row">
              <input
                type="text"
                placeholder="Learner Sync ID (e.g. atlas-sudais)"
                value={learnerInput}
                onChange={(e) => setLearnerInput(e.target.value)}
              />
              <button
                className="ghost-btn"
                onClick={() => {
                  if (learnerInput.trim()) {
                    onUpdateLearnerKey(learnerInput.trim());
                    setNotice(`Sync ID set to ${learnerInput.trim()}`);
                  }
                }}
              >
                Set ID
              </button>
            </div>
            <button className="primary-step-btn" onClick={handleSaveCloud}>
              <Icon name="cloud" size={15} />
              <span>Save &amp; Sync Supabase</span>
            </button>
          </div>

          <div className="sync-block">
            <span className="sim-kicker">2. Zero-Setup Portable Backup Code</span>
            <div className="inline-row">
              <input type="text" readOnly value={backupCode} onFocus={(e) => e.target.select()} />
              <button
                className="ghost-btn"
                onClick={() => {
                  navigator.clipboard?.writeText(backupCode);
                  setNotice('Copied backup code to clipboard.');
                }}
              >
                Copy
              </button>
            </div>
            <div className="inline-row">
              <input
                type="text"
                placeholder="Paste backup code from another device..."
                value={backupInput}
                onChange={(e) => setBackupInput(e.target.value)}
              />
              <button
                className="ghost-btn"
                onClick={() => {
                  const decoded = decodePortableBackup(backupInput);
                  if (decoded) {
                    onImportProgress(decoded);
                    setBackupInput('');
                    setNotice('Progress restored & merged.');
                  } else {
                    setNotice('Invalid backup code.');
                  }
                }}
              >
                Restore
              </button>
            </div>
          </div>

          {notice && <p className="sync-notice">{notice}</p>}
        </div>
      </div>
    </div>
  );
};
