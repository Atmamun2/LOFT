from setuptools import setup, find_packages

setup(
    name="ledger_of_financial_transactions",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        'Flask==3.0.0',
        'Flask-Login==0.6.3',
        'Flask-WTF==1.2.1',
        'Werkzeug==3.0.1',
        'email-validator==2.1.0',
    ],
)
