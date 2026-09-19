import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PlatformId } from '../../../types/domain';
import { Check, Info, ShieldCheck, Youtube, Instagram, Twitter } from 'lucide-react';
import { connectionService, OAuthPermissions } from '../../../services/connectionService';
import { useToast } from '../../../context/ToastContext';

export interface OAuthSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: PlatformId | null;
  onSuccess: () => void;
}

export const OAuthSimulatorModal: React.FC<OAuthSimulatorModalProps> = ({
  isOpen,
  onClose,
  platform,
  onSuccess,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  if (!platform) return null;

  const platformName =
    platform === 'youtube' ? 'YouTube' : platform === 'instagram' ? 'Instagram' : 'X';

  const getPlatformIcon = () => {
    if (platform === 'youtube') return <Youtube className="w-6 h-6 text-[#FF0000]" />;
    if (platform === 'instagram') return <Instagram className="w-6 h-6 text-[#E1306C]" />;
    return <Twitter className="w-6 h-6 text-[#1DA1F2]" />;
  };

  const permissionsList = [
    'View basic profile & account details',
    'Read audience & follower analytics',
    'Read post & video engagement metrics',
    'Read historical time-series performance data',
  ];

  const handleAuthorize = async () => {
    setIsConnecting(true);
    try {
      const permissions: OAuthPermissions = {
        readProfile: true,
        readAnalytics: true,
        readContent: true,
      };

      await connectionService.simulateOAuthConnect(platform, permissions);
      toast(`${platformName} Connected Successfully`, {
        type: 'success',
        message: 'Platform data is now synchronized with The Cluster.',
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      toast(`Failed to connect ${platformName}`, {
        type: 'error',
        message: err.message || 'Authorization attempt failed.',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Connect ${platformName}`}
      description="Authorize The Cluster to read performance metrics"
      size="md"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isConnecting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAuthorize}
            isLoading={isConnecting}
            leftIcon={<ShieldCheck className="w-4 h-4" />}
          >
            Allow Access & Connect
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {/* Development Simulation Disclaimer Banner */}
        <div className="p-3.5 rounded-xl border border-[var(--accent-electric)]/40 bg-[var(--accent-electric)]/10 text-xs text-[var(--text-primary)] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[var(--accent-electric)] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-display font-bold">Development Simulation:</strong> This screen
            simulates the OAuth 2.0 authorization code flow. No real third-party provider credentials
            are collected or sent over the wire.
          </div>
        </div>

        {/* Platform Identity Card */}
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
              {getPlatformIcon()}
            </div>
            <div>
              <div className="text-sm font-bold font-display text-[var(--text-primary)]">
                {platformName} Provider OAuth
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Scope: read_analytics, read_profile</div>
            </div>
          </div>
          <Badge variant={platform} size="sm">
            OAuth 2.0 PKCE
          </Badge>
        </div>

        {/* Requested Scopes / Permissions List */}
        <div>
          <h4 className="text-xs font-semibold font-display uppercase tracking-wider text-[var(--text-secondary)] mb-2">
            Requested Permissions
          </h4>
          <div className="space-y-2">
            {permissionsList.map((perm, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                <div className="w-4 h-4 rounded-full bg-[var(--accent-lime)]/20 text-[var(--accent-lime)] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{perm}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
