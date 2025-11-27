import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const Header = ({ networkState }) => {
  const isSynced = networkState === 'synced';

  return (
    <header className="header">
      <h1>LOFT Financial Dashboard</h1>
      <div className={`network-status ${isSynced ? 'synced' : 'syncing'}`}>
        {isSynced ? <Wifi size={20} /> : <WifiOff size={20} />}
        <span>{isSynced ? 'Synced' : 'Syncing...'}</span>
      </div>
    </header>
  );
};

export default Header;