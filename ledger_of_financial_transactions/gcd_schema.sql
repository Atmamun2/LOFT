-- GCD (Generis Citadel Dynasty) Database Schema
-- This schema supports the complete GCD ecosystem including Houses, Members, Transactions, and Governance

-- Houses table - Core organizational unit
CREATE TABLE IF NOT EXISTS houses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    founder_id INTEGER,
    is_active BOOLEAN DEFAULT 1,
    motto TEXT,
    rules TEXT,
    last_merge_date TIMESTAMP,
    net_worth REAL DEFAULT 0,
    total_members INTEGER DEFAULT 0
);

-- Users table - All individuals in the system
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    profile_picture TEXT,
    bio TEXT
);

-- House members mapping with roles and contribution tracking
CREATE TABLE IF NOT EXISTS house_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    house_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('founder', 'president', 'member', 'culprit')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'removed')),
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_warning_date TIMESTAMP,
    warning_count INTEGER DEFAULT 0,
    contribution_score REAL DEFAULT 0,
    equity_stake REAL DEFAULT 0,
    last_activity TIMESTAMP,
    FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(house_id, user_id)
);

-- Assets table - Track all assets owned by house members
CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    asset_type TEXT NOT NULL CHECK (asset_type IN ('property', 'investment', 'business', 'vehicle', 'art', 'other')),
    current_value REAL NOT NULL,
    acquisition_cost REAL,
    acquisition_date DATE,
    owner_house_id INTEGER,
    owner_user_id INTEGER,
    is_shared BOOLEAN DEFAULT 0,
    percentage_owned REAL DEFAULT 100,
    valuation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_house_id) REFERENCES houses(id),
    FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

-- Transactions table - All financial transactions
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rejected', 'disputed')),
    created_by INTEGER NOT NULL,
    approved_by INTEGER,
    approval_date TIMESTAMP,
    house_id INTEGER NOT NULL,
    transaction_type TEXT DEFAULT 'regular' CHECK (transaction_type IN ('regular', 'inter_house', 'merger', 'veto_related')),
    related_house_id INTEGER,
    priority_level INTEGER DEFAULT 1 CHECK (priority_level BETWEEN 1 AND 5),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    FOREIGN KEY (house_id) REFERENCES houses(id),
    FOREIGN KEY (related_house_id) REFERENCES houses(id)
);

-- Transaction entries for double-entry accounting
CREATE TABLE IF NOT EXISTS transaction_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    entry_type TEXT NOT NULL CHECK (entry_type IN ('debit', 'credit')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- Accounts for double-entry accounting system
CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    account_type TEXT NOT NULL CHECK (account_type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
    parent_id INTEGER,
    house_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    balance REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES accounts(id),
    FOREIGN KEY (house_id) REFERENCES houses(id)
);

-- Veto proposals and voting system
CREATE TABLE IF NOT EXISTS veto_proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    house_id INTEGER NOT NULL,
    proposed_by INTEGER NOT NULL,
    target_member_id INTEGER NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn', 'expired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    votes_required INTEGER NOT NULL,
    votes_received INTEGER DEFAULT 0,
    votes_for INTEGER DEFAULT 0,
    votes_against INTEGER DEFAULT 0,
    founder_approval_required BOOLEAN DEFAULT 1,
    founder_approved BOOLEAN DEFAULT 0,
    veto_conditions_met TEXT, -- JSON array of which 9 conditions are met
    final_decision_date TIMESTAMP,
    FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE,
    FOREIGN KEY (proposed_by) REFERENCES users(id),
    FOREIGN KEY (target_member_id) REFERENCES house_members(id)
);

-- Individual veto votes
CREATE TABLE IF NOT EXISTS veto_votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proposal_id INTEGER NOT NULL,
    voter_id INTEGER NOT NULL,
    vote BOOLEAN NOT NULL, -- TRUE for approve, FALSE for reject
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments TEXT,
    weight REAL DEFAULT 1.0, -- Vote weight based on member contribution
    FOREIGN KEY (proposal_id) REFERENCES veto_proposals(id) ON DELETE CASCADE,
    FOREIGN KEY (voter_id) REFERENCES users(id),
    UNIQUE(proposal_id, voter_id)
);

-- House merge proposals
CREATE TABLE IF NOT EXISTS merge_proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_house_id INTEGER NOT NULL,
    target_house_id INTEGER NOT NULL,
    proposed_by INTEGER NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn', 'expired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    terms TEXT,
    votes_required_source INTEGER DEFAULT 3,
    votes_required_target INTEGER DEFAULT 3,
    votes_received_source INTEGER DEFAULT 0,
    votes_received_target INTEGER DEFAULT 0,
    votes_for_source INTEGER DEFAULT 0,
    votes_for_target INTEGER DEFAULT 0,
    founder_approval_source BOOLEAN DEFAULT 0,
    founder_approval_target BOOLEAN DEFAULT 0,
    merge_completion_date TIMESTAMP,
    FOREIGN KEY (source_house_id) REFERENCES houses(id),
    FOREIGN KEY (target_house_id) REFERENCES houses(id),
    FOREIGN KEY (proposed_by) REFERENCES users(id)
);

-- House merge votes
CREATE TABLE IF NOT EXISTS merge_votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    merge_proposal_id INTEGER NOT NULL,
    voter_id INTEGER NOT NULL,
    voter_house_id INTEGER NOT NULL,
    vote BOOLEAN NOT NULL, -- TRUE for approve, FALSE for reject
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments TEXT,
    FOREIGN KEY (merge_proposal_id) REFERENCES merge_proposals(id) ON DELETE CASCADE,
    FOREIGN KEY (voter_id) REFERENCES users(id),
    FOREIGN KEY (voter_house_id) REFERENCES houses(id),
    UNIQUE(merge_proposal_id, voter_id)
);

-- Comprehensive audit log
CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    user_id INTEGER,
    house_id INTEGER,
    target_type TEXT, -- 'user', 'transaction', 'asset', 'house', 'veto_proposal', 'merge_proposal'
    target_id INTEGER,
    old_values TEXT, -- JSON string of old values
    new_values TEXT, -- JSON string of new values
    ip_address TEXT,
    user_agent TEXT,
    session_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (house_id) REFERENCES houses(id)
);

-- House performance metrics
CREATE TABLE IF NOT EXISTS house_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    house_id INTEGER NOT NULL,
    metric_date DATE NOT NULL,
    net_worth REAL NOT NULL,
    total_assets REAL NOT NULL,
    total_liabilities REAL NOT NULL,
    total_equity REAL NOT NULL,
    monthly_income REAL NOT NULL,
    monthly_expenses REAL NOT NULL,
    net_time_value_days REAL NOT NULL, -- How many days house can sustain itself
    active_member_count INTEGER NOT NULL,
    average_contribution_score REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE,
    UNIQUE(house_id, metric_date)
);

-- Member performance tracking
CREATE TABLE IF NOT EXISTS member_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    house_id INTEGER NOT NULL,
    metric_date DATE NOT NULL,
    contribution_score REAL NOT NULL,
    equity_stake REAL NOT NULL,
    transactions_approved INTEGER DEFAULT 0,
    transactions_created INTEGER DEFAULT 0,
    assets_value REAL NOT NULL,
    net_time_value_days REAL NOT NULL,
    warning_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (house_id) REFERENCES houses(id),
    UNIQUE(user_id, house_id, metric_date)
);

-- Inter-house relationships
CREATE TABLE IF NOT EXISTS house_relationships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    house_1_id INTEGER NOT NULL,
    house_2_id INTEGER NOT NULL,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN ('allied', 'neutral', 'competitive', 'merged')),
    relationship_strength REAL DEFAULT 0, -- -1 to 1 scale
    transaction_count INTEGER DEFAULT 0,
    total_transaction_value REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (house_1_id) REFERENCES houses(id),
    FOREIGN KEY (house_2_id) REFERENCES houses(id),
    UNIQUE(house_1_id, house_2_id)
);

-- Business entities owned by houses
CREATE TABLE IF NOT EXISTS businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    business_type TEXT NOT NULL,
    registration_number TEXT,
    owner_house_id INTEGER NOT NULL,
    current_valuation REAL NOT NULL,
    annual_revenue REAL NOT NULL,
    employee_count INTEGER DEFAULT 0,
    founded_date DATE,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_house_id) REFERENCES houses(id)
);

-- Investment portfolios
CREATE TABLE IF NOT EXISTS investment_portfolios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    owner_house_id INTEGER,
    owner_user_id INTEGER,
    portfolio_type TEXT NOT NULL CHECK (portfolio_type IN ('stocks', 'bonds', 'real_estate', 'crypto', 'mixed')),
    total_value REAL NOT NULL,
    risk_level INTEGER DEFAULT 3 CHECK (risk_level BETWEEN 1 AND 5),
    expected_return REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_house_id) REFERENCES houses(id),
    FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

-- Individual investments within portfolios
CREATE TABLE IF NOT EXISTS investments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    portfolio_id INTEGER NOT NULL,
    investment_name TEXT NOT NULL,
    investment_type TEXT NOT NULL,
    symbol TEXT,
    quantity REAL NOT NULL,
    purchase_price REAL NOT NULL,
    current_price REAL NOT NULL,
    purchase_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (portfolio_id) REFERENCES investment_portfolios(id) ON DELETE CASCADE
);

-- Create indexes for performance optimization
CREATE INDEX idx_houses_founder ON houses(founder_id);
CREATE INDEX idx_house_members_house ON house_members(house_id);
CREATE INDEX idx_house_members_user ON house_members(user_id);
CREATE INDEX idx_assets_house ON assets(owner_house_id);
CREATE INDEX idx_assets_user ON assets(owner_user_id);
CREATE INDEX idx_transactions_house ON transactions(house_id);
CREATE INDEX idx_transactions_created_by ON transactions(created_by);
CREATE INDEX idx_transaction_entries_transaction ON transaction_entries(transaction_id);
CREATE INDEX idx_transaction_entries_account ON transaction_entries(account_id);
CREATE INDEX idx_accounts_house ON accounts(house_id);
CREATE INDEX idx_veto_proposals_house ON veto_proposals(house_id);
CREATE INDEX idx_veto_votes_proposal ON veto_votes(proposal_id);
CREATE INDEX idx_merge_proposals_source ON merge_proposals(source_house_id);
CREATE INDEX idx_merge_proposals_target ON merge_proposals(target_house_id);
CREATE INDEX idx_audit_log_house ON audit_log(house_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_house_metrics_house_date ON house_metrics(house_id, metric_date);
CREATE INDEX idx_member_metrics_user_house ON member_metrics(user_id, house_id);

-- Create triggers for automatic updates
CREATE TRIGGER update_house_member_count 
    AFTER INSERT OR DELETE OR UPDATE ON house_members
    BEGIN
        UPDATE houses 
        SET total_members = (
            SELECT COUNT(*) FROM house_members 
            WHERE house_id = NEW.house_id AND status = 'active'
        )
        WHERE id = NEW.house_id;
    END;

CREATE TRIGGER update_account_balance
    AFTER INSERT ON transaction_entries
    BEGIN
        UPDATE accounts 
        SET balance = balance + (
            CASE WHEN NEW.entry_type = 'debit' THEN NEW.amount ELSE -NEW.amount END
        ),
        last_updated = CURRENT_TIMESTAMP
        WHERE id = NEW.account_id;
    END;

CREATE TRIGGER update_asset_last_updated
    AFTER UPDATE ON assets
    BEGIN
        UPDATE assets 
        SET last_updated = CURRENT_TIMESTAMP
        WHERE id = NEW.id;
    END;
