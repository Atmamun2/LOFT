import os
import sqlite3
import click
from datetime import datetime, timedelta
from flask import current_app, g
from werkzeug.security import generate_password_hash


def get_db():
    """Get database connection for GCD application."""
    if 'db' not in g:
        database_path = current_app.config['DATABASE']
        g.db = sqlite3.connect(database_path)
        g.db.row_factory = sqlite3.Row
    return g.db


def close_db(e=None):
    """Close database connection."""
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    """Initialize GCD database with schema."""
    db = get_db()
    schema_path = current_app.config.get('SCHEMA_PATH', 'schema.sql')
    with current_app.open_resource(schema_path) as f:
        db.executescript(f.read().decode('utf-8'))


def init_app(app):
    """Register database functions with the Flask app."""
    app.teardown_appcontext(close_db)

    @app.cli.command('init-db')
    def init_db_command():
        """Clear existing data and create new tables."""
        init_db()
        click.echo('Initialized the GCD database.')

    @app.cli.command('seed-gcd')
    def seed_gcd_command():
        """Seed database with GCD example data."""
        seed_gcd_data()
        click.echo('Seeded GCD database with example data.')

    @app.cli.command('reset-gcd')
    def reset_gcd_command():
        """Reset and reseed GCD database."""
        init_db()
        seed_gcd_data()
        click.echo('Reset and reseeded GCD database.')


def seed_gcd_data():
    """Seed GCD database with comprehensive example data."""
    db = get_db()
    
    # Create example users
    users = [
        {
            'username': 'john_founder',
            'email': 'john@gcd-house.com',
            'password_hash': generate_password_hash('founder123'),
            'full_name': 'John Anderson',
            'date_of_birth': '1980-05-15'
        },
        {
            'username': 'mary_president',
            'email': 'mary@gcd-house.com',
            'password_hash': generate_password_hash('president123'),
            'full_name': 'Mary Anderson',
            'date_of_birth': '1982-08-22'
        },
        {
            'username': 'robert_member',
            'email': 'robert@gcd-house.com',
            'password_hash': generate_password_hash('member123'),
            'full_name': 'Robert Anderson',
            'date_of_birth': '1985-03-10'
        },
        {
            'username': 'susan_member',
            'email': 'susan@gcd-house.com',
            'password_hash': generate_password_hash('member123'),
            'full_name': 'Susan Anderson',
            'date_of_birth': '1987-11-28'
        },
        {
            'username': 'james_culprit',
            'email': 'james@gcd-house.com',
            'password_hash': generate_password_hash('culprit123'),
            'full_name': 'James Anderson',
            'date_of_birth': '1990-07-14'
        }
    ]
    
    user_ids = {}
    for user in users:
        cursor = db.execute(
            'INSERT INTO users (username, email, password_hash, full_name, date_of_birth) '
            'VALUES (?, ?, ?, ?, ?)',
            (user['username'], user['email'], user['password_hash'], 
             user['full_name'], user['date_of_birth'])
        )
        user_ids[user['username']] = cursor.lastrowid
    
    # Create main house
    cursor = db.execute(
        '''INSERT INTO houses (name, description, motto, rules, founder_id) 
           VALUES (?, ?, ?, ?, ?)''',
        ('Anderson Dynasty', 
         'A multi-generational family house focused on financial prosperity and unity',
         'Unity Through Transparency, Prosperity Through Trust',
         '1. All transactions must be recorded and verified\n2. Members must contribute positively\n3. No fraudulent activities allowed\n4. Founder has final say in major decisions\n5. 64% majority required for major changes',
         user_ids['john_founder'])
    )
    house_id = cursor.lastrowid
    
    # Create second house for merge example
    cursor = db.execute(
        '''INSERT INTO houses (name, description, motto, rules, founder_id) 
           VALUES (?, ?, ?, ?, ?)''',
        ('Smith Heritage',
         'A family house focused on business investments and growth',
         'Growth Through Innovation, Success Through Unity',
         '1. Business decisions require 75% approval\n2. All investments must be documented\n3. Quarterly performance reviews required',
         user_ids['mary_president'])
    )
    smith_house_id = cursor.lastrowid
    
    # Add house members
    members = [
        {'house_id': house_id, 'user_id': user_ids['john_founder'], 'role': 'founder', 'status': 'active', 'contribution_score': 100.0},
        {'house_id': house_id, 'user_id': user_ids['mary_president'], 'role': 'president', 'status': 'active', 'contribution_score': 85.0},
        {'house_id': house_id, 'user_id': user_ids['robert_member'], 'role': 'member', 'status': 'active', 'contribution_score': 75.0},
        {'house_id': house_id, 'user_id': user_ids['susan_member'], 'role': 'member', 'status': 'active', 'contribution_score': 70.0},
        {'house_id': house_id, 'user_id': user_ids['james_culprit'], 'role': 'member', 'status': 'active', 'contribution_score': -20.0, 'warning_count': 2},
        {'house_id': smith_house_id, 'user_id': user_ids['mary_president'], 'role': 'founder', 'status': 'active', 'contribution_score': 90.0}
    ]
    
    member_ids = {}
    for member in members:
        cursor = db.execute(
            '''INSERT INTO house_members (house_id, user_id, role, status, contribution_score, warning_count) 
               VALUES (?, ?, ?, ?, ?, ?)''',
            (member['house_id'], member['user_id'], member['role'], 
             member['status'], member['contribution_score'], member.get('warning_count', 0))
        )
        member_ids[f"{member['house_id']}_{member['user_id']}"] = cursor.lastrowid
    
    # Create accounts for Anderson Dynasty
    accounts = [
        # Assets
        {'name': 'Cash & Bank', 'account_type': 'asset', 'house_id': house_id, 'parent_id': None},
        {'name': 'Real Estate', 'account_type': 'asset', 'house_id': house_id, 'parent_id': None},
        {'name': 'Investments', 'account_type': 'asset', 'house_id': house_id, 'parent_id': None},
        {'name': 'Business Equity', 'account_type': 'asset', 'house_id': house_id, 'parent_id': None},
        
        # Liabilities
        {'name': 'Mortgages', 'account_type': 'liability', 'house_id': house_id, 'parent_id': None},
        {'name': 'Business Loans', 'account_type': 'liability', 'house_id': house_id, 'parent_id': None},
        
        # Equity
        {'name': 'Members Equity', 'account_type': 'equity', 'house_id': house_id, 'parent_id': None},
        
        # Revenue
        {'name': 'Salary Income', 'account_type': 'revenue', 'house_id': house_id, 'parent_id': None},
        {'name': 'Business Income', 'account_type': 'revenue', 'house_id': house_id, 'parent_id': None},
        {'name': 'Investment Returns', 'account_type': 'revenue', 'house_id': house_id, 'parent_id': None},
        
        # Expenses
        {'name': 'Living Expenses', 'account_type': 'expense', 'house_id': house_id, 'parent_id': None},
        {'name': 'Business Expenses', 'account_type': 'expense', 'house_id': house_id, 'parent_id': None}
    ]
    
    account_ids = {}
    for account in accounts:
        cursor = db.execute(
            'INSERT INTO accounts (name, account_type, house_id, parent_id) VALUES (?, ?, ?, ?)',
            (account['name'], account['account_type'], account['house_id'], account['parent_id'])
        )
        account_ids[account['name']] = cursor.lastrowid
    
    # Create assets
    assets = [
        {'name': 'Family Home', 'description': 'Primary residence in suburbs', 'asset_type': 'property', 
         'current_value': 750000, 'acquisition_date': '2010-06-15', 'owner_house_id': house_id, 'is_shared': True},
        {'name': 'Rental Property', 'description': 'Downtown apartment building', 'asset_type': 'property', 
         'current_value': 450000, 'acquisition_date': '2015-03-20', 'owner_house_id': house_id, 'is_shared': True},
        {'name': 'Anderson Consulting', 'description': 'Family business consulting firm', 'asset_type': 'business', 
         'current_value': 1200000, 'acquisition_date': '2008-01-10', 'owner_house_id': house_id, 'is_shared': True},
        {'name': 'Investment Portfolio', 'description': 'Stocks and bonds portfolio', 'asset_type': 'investment', 
         'current_value': 320000, 'acquisition_date': '2012-09-01', 'owner_house_id': house_id, 'is_shared': True},
        {'name': "John's Personal Car", 'description': 'Luxury sedan', 'asset_type': 'other', 
         'current_value': 65000, 'acquisition_date': '2021-04-10', 'owner_user_id': user_ids['john_founder'], 'is_shared': False}
    ]
    
    for asset in assets:
        db.execute(
            '''INSERT INTO assets (name, description, asset_type, current_value, acquisition_date, 
                                 owner_house_id, owner_user_id, is_shared) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
            (asset['name'], asset['description'], asset['asset_type'], asset['current_value'], 
             asset['acquisition_date'], asset.get('owner_house_id'), asset.get('owner_user_id'), asset['is_shared'])
        )
    
    # Create sample transactions
    transactions = [
        {
            'description': 'Monthly Salary - John',
            'amount': 15000,
            'created_by': user_ids['john_founder'],
            'approved_by': user_ids['mary_president'],
            'house_id': house_id,
            'entries': [
                {'account_id': account_ids['Cash & Bank'], 'amount': 15000, 'entry_type': 'debit', 'description': 'Cash received'},
                {'account_id': account_ids['Salary Income'], 'amount': 15000, 'entry_type': 'credit', 'description': 'Salary income'}
            ]
        },
        {
            'description': 'Business Income - Anderson Consulting',
            'amount': 25000,
            'created_by': user_ids['mary_president'],
            'approved_by': user_ids['john_founder'],
            'house_id': house_id,
            'entries': [
                {'account_id': account_ids['Cash & Bank'], 'amount': 25000, 'entry_type': 'debit', 'description': 'Business revenue'},
                {'account_id': account_ids['Business Income'], 'amount': 25000, 'entry_type': 'credit', 'description': 'Business income'}
            ]
        },
        {
            'description': 'Mortgage Payment',
            'amount': 3500,
            'created_by': user_ids['robert_member'],
            'approved_by': user_ids['mary_president'],
            'house_id': house_id,
            'entries': [
                {'account_id': account_ids['Mortgages'], 'amount': 3500, 'entry_type': 'debit', 'description': 'Mortgage reduction'},
                {'account_id': account_ids['Cash & Bank'], 'amount': 3500, 'entry_type': 'credit', 'description': 'Cash paid'}
            ]
        },
        {
            'description': 'Investment Returns - Q4 2024',
            'amount': 8500,
            'created_by': user_ids['susan_member'],
            'approved_by': user_ids['john_founder'],
            'house_id': house_id,
            'entries': [
                {'account_id': account_ids['Cash & Bank'], 'amount': 8500, 'entry_type': 'debit', 'description': 'Investment returns'},
                {'account_id': account_ids['Investment Returns'], 'amount': 8500, 'entry_type': 'credit', 'description': 'Investment income'}
            ]
        }
    ]
    
    for transaction in transactions:
        cursor = db.execute(
            '''INSERT INTO transactions (description, amount, created_by, approved_by, house_id, status, approval_date) 
               VALUES (?, ?, ?, ?, ?, ?, ?)''',
            (transaction['description'], transaction['amount'], transaction['created_by'], 
             transaction['approved_by'], transaction['house_id'], 'completed', datetime.now())
        )
        transaction_id = cursor.lastrowid
        
        for entry in transaction['entries']:
            db.execute(
                '''INSERT INTO transaction_entries (transaction_id, account_id, amount, entry_type, description) 
                   VALUES (?, ?, ?, ?, ?)''',
                (transaction_id, entry['account_id'], entry['amount'], entry['entry_type'], entry['description'])
            )
    
    # Create veto proposal for James (the problematic member)
    cursor = db.execute(
        '''INSERT INTO veto_proposals (house_id, proposed_by, target_member_id, reason, votes_required, founder_approval_required) 
           VALUES (?, ?, ?, ?, ?, ?)''',
        (house_id, user_ids['mary_president'], member_ids[f"{house_id}_{user_ids['james_culprit']}"],
         'James has consistently shown negative contribution (-20) and has received 2 warnings for attempting fraudulent transactions. '
         'He is consuming house resources without providing value and going against the house motto of unity and trust.',
         3, True)  # 3 votes required, founder approval needed
    )
    veto_proposal_id = cursor.lastrowid
    
    # Add votes for veto proposal
    db.execute(
        '''INSERT INTO veto_votes (proposal_id, voter_id, vote, comments) 
           VALUES (?, ?, ?, ?)''',
        (veto_proposal_id, user_ids['john_founder'], True, 'I agree with the veto proposal. James has violated house rules.')
    )
    
    db.execute(
        '''INSERT INTO veto_votes (proposal_id, voter_id, vote, comments) 
           VALUES (?, ?, ?, ?)''',
        (veto_proposal_id, user_ids['robert_member'], True, 'James has been problematic. Support the veto.')
    )
    
    # Create merge proposal between Anderson Dynasty and Smith Heritage
    cursor = db.execute(
        '''INSERT INTO merge_proposals (source_house_id, target_house_id, proposed_by, terms) 
           VALUES (?, ?, ?, ?)''',
        (smith_house_id, house_id, user_ids['mary_president'],
         'Smith Heritage will merge into Anderson Dynasty. All assets and members will be integrated. '
         'Mary will become Co-President alongside current President. Business investments will be consolidated '
         'under Anderson Consulting umbrella.')
    )
    merge_proposal_id = cursor.lastrowid
    
    # Add merge votes
    db.execute(
        '''INSERT INTO merge_votes (merge_proposal_id, voter_id, vote, comments) 
           VALUES (?, ?, ?, ?)''',
        (merge_proposal_id, user_ids['john_founder'], True, 'Merge makes strategic sense for both houses.')
    )
    
    db.execute(
        '''INSERT INTO merge_votes (merge_proposal_id, voter_id, vote, comments) 
           VALUES (?, ?, ?, ?)''',
        (merge_proposal_id, user_ids['mary_president'], True, 'Proposed by me, fully support this merger.')
    )
    
    # Create audit log entries
    audit_entries = [
        {'event_type': 'house_created', 'user_id': user_ids['john_founder'], 'house_id': house_id, 'target_type': 'house', 'target_id': house_id, 'new_values': 'Anderson Dynasty house created'},
        {'event_type': 'member_joined', 'user_id': user_ids['mary_president'], 'house_id': house_id, 'target_type': 'user', 'target_id': user_ids['mary_president'], 'new_values': 'Mary joined as President'},
        {'event_type': 'transaction_created', 'user_id': user_ids['john_founder'], 'house_id': house_id, 'target_type': 'transaction', 'target_id': 1, 'new_values': 'Monthly Salary transaction created'},
        {'event_type': 'veto_proposed', 'user_id': user_ids['mary_president'], 'house_id': house_id, 'target_type': 'veto_proposal', 'target_id': veto_proposal_id, 'new_values': 'Veto proposed for James'},
        {'event_type': 'merge_proposed', 'user_id': user_ids['mary_president'], 'house_id': house_id, 'target_type': 'merge_proposal', 'target_id': merge_proposal_id, 'new_values': 'Merge proposed with Smith Heritage'}
    ]
    
    for entry in audit_entries:
        db.execute(
            '''INSERT INTO audit_log (event_type, user_id, house_id, target_type, target_id, new_values) 
               VALUES (?, ?, ?, ?, ?, ?)''',
            (entry['event_type'], entry['user_id'], entry['house_id'], 
             entry['target_type'], entry['target_id'], entry['new_values'])
        )
    
    db.commit()


# GCD-specific database utility functions
def get_house_net_worth(house_id):
    """Calculate total net worth of a house."""
    db = get_db()
    
    # Get total assets
    assets_result = db.execute(
        '''SELECT SUM(current_value) as total FROM assets 
           WHERE owner_house_id = ? OR is_shared = 1''', (house_id,)
    ).fetchone()
    
    # Get total from accounts (double-entry accounting)
    accounts_result = db.execute(
        '''SELECT 
           SUM(CASE WHEN account_type = 'asset' THEN balance ELSE 0 END) as total_assets,
           SUM(CASE WHEN account_type = 'liability' THEN balance ELSE 0 END) as total_liabilities,
           SUM(CASE WHEN account_type = 'equity' THEN balance ELSE 0 END) as total_equity
           FROM (
               SELECT a.account_type, SUM(te.amount) as balance
               FROM accounts a
               JOIN transaction_entries te ON a.id = te.account_id
               WHERE a.house_id = ?
               GROUP BY a.account_type
           )''', (house_id,)
    ).fetchone()
    
    net_worth = 0
    if assets_result['total']:
        net_worth += assets_result['total']
    if accounts_result['total_assets']:
        net_worth += accounts_result['total_assets']
    if accounts_result['total_liabilities']:
        net_worth -= accounts_result['total_liabilities']
    
    return net_worth


def get_member_contribution_score(user_id, house_id):
    """Get contribution score for a house member."""
    db = get_db()
    result = db.execute(
        'SELECT contribution_score FROM house_members WHERE user_id = ? AND house_id = ?',
        (user_id, house_id)
    ).fetchone()
    return result['contribution_score'] if result else 0


def get_pending_veto_proposals(house_id):
    """Get all pending veto proposals for a house."""
    db = get_db()
    return db.execute(
        '''SELECT vp.*, u.username as proposed_by_name, ut.username as target_name
           FROM veto_proposals vp
           JOIN users u ON vp.proposed_by = u.id
           JOIN house_members hm ON vp.target_member_id = hm.id
           JOIN users ut ON hm.user_id = ut.id
           WHERE vp.house_id = ? AND vp.status = 'pending'
           ORDER BY vp.created_at DESC''', (house_id,)
    ).fetchall()


def get_house_members_by_role(house_id):
    """Get house members grouped by role."""
    db = get_db()
    return db.execute(
        '''SELECT hm.*, u.username, u.full_name, u.email
           FROM house_members hm
           JOIN users u ON hm.user_id = u.id
           WHERE hm.house_id = ? AND hm.status = 'active'
           ORDER BY 
           CASE hm.role 
               WHEN 'founder' THEN 1
               WHEN 'president' THEN 2
               WHEN 'member' THEN 3
               ELSE 4
           END''', (house_id,)
    ).fetchall()


def calculate_net_time_value(house_id, daily_expense_estimate=200):
    """Calculate how many days the house can sustain itself on current net worth."""
    net_worth = get_house_net_worth(house_id)
    return net_worth / daily_expense_estimate if daily_expense_estimate > 0 else 0


__all__ = [
    'get_db', 'init_db', 'init_app', 'seed_gcd_data',
    'get_house_net_worth', 'get_member_contribution_score', 
    'get_pending_veto_proposals', 'get_house_members_by_role',
    'calculate_net_time_value'
]
