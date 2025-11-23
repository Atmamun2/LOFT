#!/usr/bin/env python3
"""
GCD (Generis Citadel Dynasty) CLI Application
A command-line interface to interact with the GCD database system.
"""

import os
import sys
from datetime import datetime
from flask import Flask
from flask.cli import with_appcontext

# Add the current directory to Python path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from gcd_database import (
    get_db, init_db, seed_gcd_data, get_house_net_worth,
    get_member_contribution_score, get_pending_veto_proposals,
    get_house_members_by_role, calculate_net_time_value
)


def create_app():
    """Create Flask application for GCD CLI."""
    app = Flask(__name__)
    
    # Configuration
    app.config.update({
        'DATABASE': os.path.join(os.path.dirname(__file__), 'instance', 'gcd_database.db'),
        'SCHEMA_PATH': 'gcd_schema.sql',
        'SECRET_KEY': 'gcd-cli-secret-key-for-development'
    })
    
    # Initialize database
    from gcd_database import init_app
    init_app(app)
    
    return app


def display_house_summary(house_id):
    """Display comprehensive house summary."""
    print(f"\n{'='*60}")
    print(f"HOUSE SUMMARY - ID: {house_id}")
    print(f"{'='*60}")
    
    db = get_db()
    
    # Get house details
    house = db.execute('SELECT * FROM houses WHERE id = ?', (house_id,)).fetchone()
    if not house:
        print(f"House with ID {house_id} not found.")
        return
    
    print(f"Name: {house['name']}")
    print(f"Description: {house['description'] or 'N/A'}")
    print(f"Motto: {house['motto'] or 'N/A'}")
    print(f"Created: {house['created_at']}")
    print(f"Active: {'Yes' if house['is_active'] else 'No'}")
    
    # Financial summary
    net_worth = get_house_net_worth(house_id)
    net_time_days = calculate_net_time_value(house_id)
    
    print(f"\n{'─'*60}")
    print("FINANCIAL SUMMARY")
    print(f"{'─'*60}")
    print(f"Net Worth: ${net_worth:,.2f}")
    print(f"Net Time Value: {net_time_days:.1f} days of sustainability")
    
    # Assets summary
    assets = db.execute(
        '''SELECT asset_type, SUM(current_value) as total_value, COUNT(*) as count
           FROM assets 
           WHERE owner_house_id = ? OR is_shared = 1
           GROUP BY asset_type''', (house_id,)
    ).fetchall()
    
    if assets:
        print(f"\nAssets by Type:")
        for asset in assets:
            print(f"  {asset['asset_type'].title()}: ${asset['total_value']:,.2f} ({asset['count']} items)")
    
    # Members summary
    members = get_house_members_by_role(house_id)
    print(f"\n{'─'*60}")
    print("HOUSE MEMBERS")
    print(f"{'─'*60}")
    
    for member in members:
        contribution = get_member_contribution_score(member['user_id'], house_id)
        status_icon = "✓" if member['status'] == 'active' else "✗"
        print(f"{status_icon} {member['full_name']} (@{member['username']})")
        print(f"   Role: {member['role'].title()}")
        print(f"   Contribution Score: {contribution:+.1f}")
        print(f"   Joined: {member['join_date']}")
        if member['warning_count'] > 0:
            print(f"   ⚠️  Warnings: {member['warning_count']}")
        print()


def display_pending_proposals(house_id):
    """Display pending veto and merge proposals."""
    print(f"\n{'='*60}")
    print(f"PENDING PROPOSALS - House ID: {house_id}")
    print(f"{'='*60}")
    
    # Veto proposals
    veto_proposals = get_pending_veto_proposals(house_id)
    if veto_proposals:
        print("\n⚖️  VETO PROPOSALS:")
        print(f"{'─'*60}")
        for proposal in veto_proposals:
            print(f"Proposal ID: {proposal['id']}")
            print(f"Target: {proposal['target_name']} (@{proposal['target_name']})")
            print(f"Proposed by: {proposal['proposed_by_name']}")
            print(f"Reason: {proposal['reason']}")
            print(f"Votes Required: {proposal['votes_required']}")
            print(f"Votes Received: {proposal['votes_received']}")
            print(f"Founder Approval Required: {'Yes' if proposal['founder_approval_required'] else 'No'}")
            print(f"Created: {proposal['created_at']}")
            print()
    else:
        print("\n⚖️  VETO PROPOSALS: None pending")
    
    # Merge proposals would be displayed here if we implement the function
    print("\n🤝 MERGE PROPOSALS: Use dedicated function to view")


def list_all_houses():
    """List all houses in the system."""
    print(f"\n{'='*60}")
    print("ALL HOUSES")
    print(f"{'='*60}")
    
    db = get_db()
    houses = db.execute('SELECT * FROM houses ORDER BY created_at').fetchall()
    
    if not houses:
        print("No houses found in the system.")
        return
    
    for house in houses:
        net_worth = get_house_net_worth(house['id'])
        member_count = db.execute(
            'SELECT COUNT(*) as count FROM house_members WHERE house_id = ? AND status = "active"',
            (house['id'],)
        ).fetchone()['count']
        
        print(f"ID: {house['id']} - {house['name']}")
        print(f"  Description: {house['description'] or 'N/A'}")
        print(f"  Members: {member_count}")
        print(f"  Net Worth: ${net_worth:,.2f}")
        print(f"  Created: {house['created_at']}")
        print()


def search_members(search_term):
    """Search for members by username or full name."""
    print(f"\n{'='*60}")
    print(f"SEARCH RESULTS FOR: '{search_term}'")
    print(f"{'='*60}")
    
    db = get_db()
    members = db.execute(
        '''SELECT u.*, hm.house_id, hm.role, hm.contribution_score, h.name as house_name
           FROM users u
           LEFT JOIN house_members hm ON u.id = hm.user_id
           LEFT JOIN houses h ON hm.house_id = h.id
           WHERE u.username LIKE ? OR u.full_name LIKE ?
           ORDER BY u.full_name''', 
        (f'%{search_term}%', f'%{search_term}%')
    ).fetchall()
    
    if not members:
        print("No members found matching your search.")
        return
    
    for member in members:
        print(f"👤 {member['full_name']} (@{member['username']})")
        print(f"   Email: {member['email']}")
        print(f"   House: {member['house_name'] or 'None'}")
        print(f"   Role: {member['role'] or 'None'}")
        print(f"   Contribution: {member['contribution_score'] or 0:+.1f}")
        print()


def show_system_stats():
    """Display overall system statistics."""
    print(f"\n{'='*60}")
    print("GCD SYSTEM STATISTICS")
    print(f"{'='*60}")
    
    db = get_db()
    
    # Basic counts
    total_houses = db.execute('SELECT COUNT(*) as count FROM houses').fetchone()['count']
    total_users = db.execute('SELECT COUNT(*) as count FROM users').fetchone()['count']
    total_members = db.execute('SELECT COUNT(*) as count FROM house_members WHERE status = "active"').fetchone()['count']
    total_assets = db.execute('SELECT COUNT(*) as count FROM assets').fetchone()['count']
    total_transactions = db.execute('SELECT COUNT(*) as count FROM transactions').fetchone()['count']
    
    print(f"📊 SYSTEM OVERVIEW:")
    print(f"   Total Houses: {total_houses}")
    print(f"   Total Users: {total_users}")
    print(f"   Active Members: {total_members}")
    print(f"   Total Assets: {total_assets}")
    print(f"   Total Transactions: {total_transactions}")
    
    # Financial aggregates
    total_net_worth = sum(get_house_net_worth(row[0]) for row in db.execute('SELECT id FROM houses'))
    total_asset_value = db.execute('SELECT SUM(current_value) as total FROM assets').fetchone()['total'] or 0
    
    print(f"\n💰 FINANCIAL SUMMARY:")
    print(f"   Total System Net Worth: ${total_net_worth:,.2f}")
    print(f"   Total Asset Value: ${total_asset_value:,.2f}")
    
    # Recent activity
    recent_transactions = db.execute(
        '''SELECT COUNT(*) as count FROM transactions 
           WHERE created_at > datetime("now", "-7 days")'''
    ).fetchone()['count']
    
    print(f"\n📈 RECENT ACTIVITY (Last 7 Days):")
    print(f"   New Transactions: {recent_transactions}")
    
    # House rankings by net worth
    print(f"\n🏆 HOUSE RANKINGS (by Net Worth):")
    top_houses = db.execute('SELECT id, name FROM houses ORDER BY name').fetchall()
    house_rankings = []
    for house in top_houses:
        net_worth = get_house_net_worth(house['id'])
        if net_worth > 0:
            house_rankings.append((house['name'], net_worth))
    
    house_rankings.sort(key=lambda x: x[1], reverse=True)
    for i, (name, net_worth) in enumerate(house_rankings[:5], 1):
        print(f"   {i}. {name}: ${net_worth:,.2f}")


def main_menu():
    """Display main menu and handle user input."""
    while True:
        print(f"\n{'='*60}")
        print("🏰 GENERIS CITADEL DYNASTY (GCD) CLI")
        print(f"{'='*60}")
        print("1. List All Houses")
        print("2. View House Details")
        print("3. View Pending Proposals")
        print("4. Search Members")
        print("5. System Statistics")
        print("6. Initialize Database")
        print("7. Seed Example Data")
        print("8. Exit")
        print()
        
        choice = input("Enter your choice (1-8): ").strip()
        
        if choice == '1':
            list_all_houses()
        
        elif choice == '2':
            house_id = input("Enter House ID: ").strip()
            if house_id.isdigit():
                display_house_summary(int(house_id))
            else:
                print("Invalid House ID. Please enter a number.")
        
        elif choice == '3':
            house_id = input("Enter House ID: ").strip()
            if house_id.isdigit():
                display_pending_proposals(int(house_id))
            else:
                print("Invalid House ID. Please enter a number.")
        
        elif choice == '4':
            search_term = input("Enter search term (username or name): ").strip()
            search_members(search_term)
        
        elif choice == '5':
            show_system_stats()
        
        elif choice == '6':
            print("Initializing database...")
            init_db()
            print("Database initialized successfully!")
        
        elif choice == '7':
            print("Seeding database with example data...")
            seed_gcd_data()
            print("Database seeded successfully!")
        
        elif choice == '8':
            print("Goodbye! 👋")
            break
        
        else:
            print("Invalid choice. Please try again.")
        
        input("\nPress Enter to continue...")


def main():
    """Main entry point for GCD CLI."""
    # Create Flask app context
    app = create_app()
    
    with app.app_context():
        # Ensure instance directory exists
        instance_dir = os.path.join(os.path.dirname(__file__), 'instance')
        os.makedirs(instance_dir, exist_ok=True)
        
        # Check if database exists
        db_path = app.config['DATABASE']
        if not os.path.exists(db_path):
            print("🗄️  Database not found. Please initialize it first (option 6).")
        
        main_menu()


if __name__ == '__main__':
    main()
