# DEPLOYMENT GUIDE: PYTHONANYWHERE

## 1. Create your PythonAnywhere account
- **Sign up** at [https://www.pythonanywhere.com/](https://www.pythonanywhere.com/).
- **Pick your username carefully**; it appears in your live URL. Example: username `gcdhouse1` → `https://gcdhouse1.pythonanywhere.com/`.

## 2. Start a Bash console
- From the PythonAnywhere dashboard, go to **Consoles → Start a new console → Bash**.

## 3. Copy this project to PythonAnywhere
```bash
cd ~
git clone https://github.com/your-username/L-FT.git
cd L-FT/ledger_of_financial_transactions
mkdir -p ~/L-FT/ledger_of_financial_transactions/instance
mkdir -p ~/L-FT/ledger_of_financial_transactions/static/uploads
```

## 4. Create a virtual environment and install dependencies
```bash
cd ~/L-FT/ledger_of_financial_transactions
python3.9 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate
```

## 5. Configure environment variables
```bash
cd ~/L-FT/ledger_of_financial_transactions
cp .env.example .env
# Edit .env with your production values:
# - SECRET_KEY (generate a strong random key)
# - FLASK_ENV=production
# - DATABASE_URL (use SQLite for PythonAnywhere: sqlite:///financial_transactions.db)
# - Email settings (if using email features)
# - ADMIN_EMAIL
```

## 6. Initialize the database
```bash
cd ~/L-FT/ledger_of_financial_transactions
source venv/bin/activate
python init_db.py
# Alternative: flask --app wsgi init-db if available
deactivate
```
- Confirm the database exists: `ls ~/L-FT/ledger_of_financial_transactions/instance/` should list `financial_transactions.db`.

## 7. Configure the web app (Web tab)
1. Open the **Web** tab → **Add a new web app** → **Manual configuration** → select **Python 3.9**.
2. Set **Working directory** to `/home/yourusername/L-FT/ledger_of_financial_transactions` (replace `yourusername`).
3. Set **Virtualenv** to `/home/yourusername/L-FT/ledger_of_financial_transactions/venv`.
4. Under **Static files**, add mappings:
   - URL: `/static/` 
   - Directory: `/home/yourusername/L-FT/ledger_of_financial_transactions/static/`
   - URL: `/uploads/` (if using file uploads)
   - Directory: `/home/yourusername/L-FT/ledger_of_financial_transactions/static/uploads/`

## 8. Update the WSGI file
- Edit `/var/www/yourusername_pythonanywhere_com_wsgi.py` so it contains:
```python
import sys
import os

project_home = '/home/yourusername/L-FT/ledger_of_financial_transactions'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Activate virtual environment
activate_this = os.path.join(project_home, 'venv', 'bin', 'activate_this.py')
with open(activate_this) as f:
    exec(f.read(), dict(__file__=activate_this))

# Import the Flask app
from app import create_app
application = create_app()

# Set environment variables
os.environ['FLASK_ENV'] = 'production'
os.environ['SECRET_KEY'] = 'your-production-secret-key-here'
```
- Save the file.

## 9. Configure database for production
- PythonAnywhere recommends using SQLite for free accounts
- Update your `.env` file:
```bash
DATABASE_URL=sqlite:///instance/financial_transactions.db
```
- For paid accounts, you can configure PostgreSQL:
```bash
DATABASE_URL=postgresql://username:password@host:port/database_name
```

## 10. Reload and test
- In the Web tab, press **Reload**.
- Visit `https://yourusername.pythonanywhere.com/` in your browser.
- If there is an error, check the **Error log** linked from the Web tab.

## 11. Security considerations for production
- **Generate a strong SECRET_KEY**:
  ```python
  import secrets
  print(secrets.token_hex(32))
  ```
- **Set FLASK_ENV=production** in your WSGI file
- **Remove debug mode** from your Flask configuration
- **Secure file uploads** if enabled (validate file types, size limits)
- **Enable HTTPS** (PythonAnywhere provides this automatically)

## 12. Optional maintenance tips

### Pull new code changes
```bash
cd ~/L-FT/ledger_of_financial_transactions
git pull
```

### Update dependencies
```bash
cd ~/L-FT/ledger_of_financial_transactions
source venv/bin/activate
pip install -r requirements.txt
deactivate
```

### Database migrations
```bash
cd ~/L-FT/ledger_of_financial_transactions
source venv/bin/activate
flask db upgrade
deactivate
```

### Restart the web app
- After any code changes, go to the **Web** tab and click **Reload**
- For database changes, you may need to restart the web app completely

### Backup your database
```bash
# For SQLite
cp ~/L-FT/ledger_of_financial_transactions/instance/financial_transactions.db ~/backups/financial_transactions_$(date +%Y%m%d).db

# For PostgreSQL (if using)
pg_dump -h host -U username database_name > backup.sql
```

## 13. Troubleshooting common issues

### Import errors
- Check that all dependencies are installed: `pip list`
- Verify the virtual environment is activated in WSGI file
- Check the error logs for specific missing modules

### Database connection errors
- Verify the database file exists in the instance directory
- Check DATABASE_URL in your environment configuration
- Ensure proper file permissions on the database file

### Static files not loading
- Verify static file mappings in the Web tab
- Check that static directories exist and have proper permissions
- Ensure CSS/JS files are in the correct static directory

### Permission errors
- Make sure the instance directory is writable: `chmod 755 ~/L-FT/ledger_of_financial_transactions/instance`
- Check upload directory permissions if using file uploads

## 14. Scaling considerations

### For higher traffic (paid plans)
- Consider upgrading to a paid PythonAnywhere plan
- Use PostgreSQL instead of SQLite for better performance
- Implement caching with Redis (available on paid plans)
- Set up monitoring and logging

### Performance optimization
- Enable Flask caching
- Optimize database queries
- Use CDN for static assets
- Implement pagination for large datasets

## 15. Next steps after deployment

1. **Test all features** - Create test accounts and verify all functionality
2. **Set up monitoring** - Use PythonAnywhere's built-in metrics
3. **Configure backups** - Regular database and file backups
4. **SSL certificate** - Already provided by PythonAnywhere
5. **Domain setup** - Configure custom domain if needed (paid feature)
6. **Email configuration** - Set up transactional email service

---

**Note**: This guide is specifically configured for the GCD (Generis Citadel Dynasty) Flask application. Adjust paths and configurations as needed for your specific deployment requirements.
