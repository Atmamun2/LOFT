-- Initialize the database
PRAGMA foreign_keys = ON;

-- Create the database schema
.read schema.sql

-- Insert system admin user (password: admin123)
INSERT INTO users (username, email, password_hash, full_name) 
VALUES ('admin', 'admin@example.com', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'System Administrator');

-- Insert a sample house
INSERT INTO houses (name, description, motto, rules, founder_id)
VALUES ('The Generis House', 'The founding house of the Generis family', 'Unity in Prosperity', '1. Respect all members\n2. Be transparent in all transactions\n3. Contribute to the house growth', 1);

-- Make admin the founder of the house
INSERT INTO house_members (house_id, user_id, role, status, contribution_score)
VALUES (1, 1, 'founder', 'active', 100);

-- Create default accounts for the house
-- Asset accounts
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Cash', 'asset', 1, NULL);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Bank Accounts', 'asset', 1, 1);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Investments', 'asset', 1, 1);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Property', 'asset', 1, 1);

-- Liability accounts
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Loans Payable', 'liability', 1, NULL);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Credit Cards', 'liability', 1, 5);

-- Equity accounts
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Members Equity', 'equity', 1, NULL);

-- Revenue accounts
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Income', 'revenue', 1, NULL);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Salary', 'revenue', 1, 8);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Business Income', 'revenue', 1, 8);

-- Expense accounts
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Expenses', 'expense', 1, NULL);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Housing', 'expense', 1, 11);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Food', 'expense', 1, 11);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Transportation', 'expense', 1, 11);
INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES ('Entertainment', 'expense', 1, 11);

-- Initial transaction - House contribution from founder
INSERT INTO transactions (description, amount, currency, status, created_by, approved_by, house_id, approval_date)
VALUES ('Initial capital contribution', 10000.00, 'USD', 'completed', 1, 1, 1, CURRENT_TIMESTAMP);

-- Record the transaction entries (double-entry)
INSERT INTO transaction_entries (transaction_id, account_id, amount, entry_type, description)
VALUES (1, 2, 10000.00, 'debit', 'Initial capital deposit');

INSERT INTO transaction_entries (transaction_id, account_id, amount, entry_type, description)
VALUES (1, 7, 10000.00, 'credit', 'Initial capital contribution');

-- Log the initialization
INSERT INTO audit_log (event_type, user_id, house_id, target_type, target_id, new_values)
VALUES ('system_init', 1, 1, 'database', 1, 'Database initialized with default data');

-- Set the founder_id in houses table
UPDATE houses SET founder_id = 1 WHERE id = 1;

-- Create a view for house balance sheet
CREATE VIEW IF NOT EXISTS house_balance_sheet AS
SELECT 
    h.id as house_id,
    h.name as house_name,
    (SELECT IFNULL(SUM(te.amount), 0) 
     FROM transaction_entries te 
     JOIN accounts a ON te.account_id = a.id 
     WHERE a.account_type = 'asset' AND a.house_id = h.id) as total_assets,
    (SELECT IFNULL(SUM(te.amount), 0) 
     FROM transaction_entries te 
     JOIN accounts a ON te.account_id = a.id 
     WHERE a.account_type = 'liability' AND a.house_id = h.id) as total_liabilities,
    (SELECT IFNULL(SUM(te.amount), 0) 
     FROM transaction_entries te 
     JOIN accounts a ON te.account_id = a.id 
     WHERE a.account_type = 'equity' AND a.house_id = h.id) as total_equity
FROM houses h
WHERE h.is_active = 1;

-- Create a view for member contributions
CREATE VIEW IF NOT EXISTS member_contributions AS
SELECT 
    hm.id as member_id,
    u.username,
    u.full_name,
    h.id as house_id,
    h.name as house_name,
    hm.contribution_score,
    (SELECT COUNT(*) FROM transactions t WHERE t.created_by = u.id AND t.house_id = h.id) as transactions_count,
    (SELECT IFNULL(SUM(te.amount), 0) 
     FROM transaction_entries te 
     JOIN transactions t ON te.transaction_id = t.id 
     WHERE t.created_by = u.id AND t.house_id = h.id AND te.entry_type = 'credit') as total_contributions
FROM house_members hm
JOIN users u ON hm.user_id = u.id
JOIN houses h ON hm.house_id = h.id
WHERE hm.status = 'active';

-- Create a view for recent transactions
CREATE VIEW IF NOT EXISTS recent_transactions AS
SELECT 
    t.id,
    t.transaction_date,
    t.description,
    t.amount,
    t.currency,
    t.status,
    u.username as created_by,
    h.name as house_name,
    GROUP_CONCAT(a.name || ' (' || te.entry_type || ' ' || te.amount || ')', ', ') as entries
FROM transactions t
JOIN users u ON t.created_by = u.id
JOIN houses h ON t.house_id = h.id
JOIN transaction_entries te ON t.id = te.transaction_id
JOIN accounts a ON te.account_id = a.id
GROUP BY t.id
ORDER BY t.transaction_date DESC
LIMIT 100;