-- Houses table to store information about each family/house
CREATE TABLE IF NOT EXISTS houses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    founder_id INTEGER,
    is_active BOOLEAN DEFAULT 1,
    motto TEXT,
    rules TEXT,
    last_merge_date TIMESTAMP
);

-- Users table for all individuals in the system
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- House members mapping with roles and status
CREATE TABLE IF NOT EXISTS house_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    house_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL, -- 'founder', 'president', 'member', 'culprit'
    status TEXT DEFAULT 'active', -- 'active', 'pending', 'suspended', 'removed'
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_warning_date TIMESTAMP,
    warning_count INTEGER DEFAULT 0,
    contribution_score REAL DEFAULT 0,
    FOREIGN KEY (house_id) REFERENCES houses(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(house_id, user_id)
);

-- Assets table to track all assets owned by house members
CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    asset_type TEXT NOT NULL, -- 'property', 'investment', 'business', 'other'
    current_value REAL NOT NULL,
    acquisition_date DATE,
    owner_house_id INTEGER,
    owner_user_id INTEGER,
    is_shared BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_house_id) REFERENCES houses(id),
    FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

-- Transactions table for double-entry accounting
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'rejected', 'disputed'
    created_by INTEGER NOT NULL,
    approved_by INTEGER,
    approval_date TIMESTAMP,
    house_id INTEGER NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    FOREIGN KEY (house_id) REFERENCES houses(id)
);

-- Transaction entries for double-entry accounting
CREATE TABLE IF NOT EXISTS transaction_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    entry_type TEXT NOT NULL, -- 'debit' or 'credit'
    description TEXT,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- Accounts for double-entry accounting
CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    account_type TEXT NOT NULL, -- 'asset', 'liability', 'equity', 'revenue', 'expense'
    parent_id INTEGER,
    house_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES accounts(id),
    FOREIGN KEY (house_id) REFERENCES houses(id)
);

-- Veto proposals and voting
CREATE TABLE IF NOT EXISTS veto_proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    house_id INTEGER NOT NULL,
    proposed_by INTEGER NOT NULL,
    target_member_id INTEGER NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'withdrawn'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    votes_required INTEGER NOT NULL,
    votes_received INTEGER DEFAULT 0,
    founder_approval_required BOOLEAN DEFAULT 1,
    founder_approved BOOLEAN DEFAULT 0,
    FOREIGN KEY (house_id) REFERENCES houses(id),
    FOREIGN KEY (proposed_by) REFERENCES users(id),
    FOREIGN KEY (target_member_id) REFERENCES house_members(id)
);

-- Votes on veto proposals
CREATE TABLE IF NOT EXISTS veto_votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proposal_id INTEGER NOT NULL,
    voter_id INTEGER NOT NULL,
    vote BOOLEAN NOT NULL, -- TRUE for approve, FALSE for reject
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments TEXT,
    FOREIGN KEY (proposal_id) REFERENCES veto_proposals(id),
    FOREIGN KEY (voter_id) REFERENCES users(id),
    UNIQUE(proposal_id, voter_id)
);

-- House merge proposals
CREATE TABLE IF NOT EXISTS merge_proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_house_id INTEGER NOT NULL,
    target_house_id INTEGER NOT NULL,
    proposed_by INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'withdrawn'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    terms TEXT,
    FOREIGN KEY (source_house_id) REFERENCES houses(id),
    FOREIGN KEY (target_house_id) REFERENCES houses(id),
    FOREIGN KEY (proposed_by) REFERENCES users(id)
);

-- House merge votes
CREATE TABLE IF NOT EXISTS merge_votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    merge_proposal_id INTEGER NOT NULL,
    voter_id INTEGER NOT NULL,
    vote BOOLEAN NOT NULL, -- TRUE for approve, FALSE for reject
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments TEXT,
    FOREIGN KEY (merge_proposal_id) REFERENCES merge_proposals(id),
    FOREIGN KEY (voter_id) REFERENCES users(id),
    UNIQUE(merge_proposal_id, voter_id)
);

-- Audit log for all important actions
CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    user_id INTEGER,
    house_id INTEGER,
    target_type TEXT, -- 'user', 'transaction', 'asset', etc.
    target_id INTEGER,
    old_values TEXT,
    new_values TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (house_id) REFERENCES houses(id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_house_members_house ON house_members(house_id);
CREATE INDEX IF NOT EXISTS idx_house_members_user ON house_members(user_id);
CREATE INDEX IF NOT EXISTS idx_assets_owner_house ON assets(owner_house_id);
CREATE INDEX IF NOT EXISTS idx_assets_owner_user ON assets(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_house ON transactions(house_id);
CREATE INDEX IF NOT EXISTS idx_transactions_creator ON transactions(created_by);
CREATE INDEX IF NOT EXISTS idx_transaction_entries_transaction ON transaction_entries(transaction_id);
CREATE INDEX IF NOT EXISTS idx_transaction_entries_account ON transaction_entries(account_id);
CREATE INDEX IF NOT EXISTS idx_veto_proposals_house ON veto_proposals(house_id);
CREATE INDEX IF NOT EXISTS idx_veto_proposals_target ON veto_proposals(target_member_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_house ON audit_log(house_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at);