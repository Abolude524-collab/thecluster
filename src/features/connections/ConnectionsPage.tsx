import React, { useState, useEffect } from 'react';
import { connectionService } from '../../services/connectionService';
import { PlatformAccount, PlatformId } from '../../types/domain';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Youtube, Instagram, Twitter, CheckCircle2, ShieldAlert, Link2Off, RefreshCw } from 'lucide-react';
import { OAuthSimulatorModal } from './components/OAuthSimulatorModal';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/ui/Modal';

export const ConnectionsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<PlatformAccount[]>([]);
  const [selectedOAuthPlatform, setSelectedOAuthPlatform] = useState<PlatformId | null>(null);
  const [disconnectPlatform, setDisconnectPlatform] = useState<PlatformId | null>(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const { toast } = useToast();

  const refreshAccounts = () => {
    setAccounts(connectionService.getConnectedAccounts());
  };

  useEffect(() => {
    refreshAccounts();
  }, []);

  const handleDisconnectConfirm = async () => {
    if (!disconnectPlatform) return;
    setIsDisconnecting(true);
    try {
      await connectionService.disconnectPlatform(disconnectPlatform);
      toast(`Disconnected ${disconnectPlatform}`, {
        type: 'info',
        message: 'Platform data connection has been revoked.',
      });
      refreshAccounts();
      setDisconnectPlatform(null);
    } catch (err: any) {
      toast('Disconnect failed', { type: 'error', message: err.message });
    } finally {
      setIsDisconnecting(false);
    }
  };

  const platformsList: { id: PlatformId; name: string; icon: React.ReactNode; description: string }[] = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <Youtube className="w-6 h-6 text-[#FF0000]" />,
      description: 'Connect your YouTube channel to monitor subscribers, video views, likes, and comments.',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6 text-[#E1306C]" />,
      description: 'Connect your Instagram Business or Creator profile to track followers, post impressions, and engagement.',
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      icon: <Twitter className="w-6 h-6 text-[#1DA1F2]" />,
      description: 'Connect your X profile to analyze follower trends, tweet impressions, likes, and retweets.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] font-display">
          Connections
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Connect your social platforms and manage authorized data scopes inside The Cluster.
        </p>
      </div>

      {/* Connection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platformsList.map((platform) => {
          const connectedAccount = accounts.find(
            (a) => a.platform === platform.id && a.connectionState === 'connected'
          );

          const isConnected = !!connectedAccount;

          return (
            <Card key={platform.id} variant="default" className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)]">
                    {platform.icon}
                  </div>
                  {isConnected ? (
                    <Badge variant="success" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                      LIVE
                    </Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">
                      DISCONNECTED
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-3">{platform.name}</CardTitle>
                <CardDescription>{platform.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {isConnected ? (
                  <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-display text-[var(--text-primary)]">
                        {connectedAccount.accountName}
                      </span>
                      <Badge variant={platform.id} size="sm">
                        {connectedAccount.handle}
                      </Badge>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] font-mono">
                      Audience:{' '}
                      <strong className="text-[var(--text-primary)]">
                        {(connectedAccount.metrics.audience ?? 0).toLocaleString()}
                      </strong>
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)] pt-1 border-t border-[var(--border-color)]/50">
                      Connected {new Date(connectedAccount.connectedAt || '').toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)]/40 border border-[var(--border-color)]/50 text-xs text-[var(--text-secondary)]">
                    No active token authorization. Click connect to simulate OAuth linking.
                  </div>
                )}
              </CardContent>

              <CardFooter className="justify-between">
                {isConnected ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOAuthPlatform(platform.id)}
                      leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                    >
                      Re-auth
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDisconnectPlatform(platform.id)}
                      leftIcon={<Link2Off className="w-3.5 h-3.5 text-[var(--status-error)]" />}
                    >
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedOAuthPlatform(platform.id)}
                  >
                    Connect {platform.name}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* OAuth Authorization Simulator Modal */}
      <OAuthSimulatorModal
        isOpen={!!selectedOAuthPlatform}
        onClose={() => setSelectedOAuthPlatform(null)}
        platform={selectedOAuthPlatform}
        onSuccess={refreshAccounts}
      />

      {/* Disconnect Confirmation Modal */}
      <Modal
        isOpen={!!disconnectPlatform}
        onClose={() => setDisconnectPlatform(null)}
        title="Revoke Platform Connection?"
        description="This will stop real-time data sync for this platform."
        size="sm"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDisconnectPlatform(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDisconnectConfirm}
              isLoading={isDisconnecting}
              leftIcon={<ShieldAlert className="w-4 h-4" />}
            >
              Disconnect
            </Button>
          </>
        }
      >
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Are you sure you want to disconnect <strong className="text-[var(--text-primary)] capitalize">{disconnectPlatform}</strong>? You can reconnect at any time using the development OAuth simulator.
        </p>
      </Modal>
    </div>
  );
};
