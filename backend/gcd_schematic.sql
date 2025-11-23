-- GCD (Generis Citadel Dynasty) Schematic Database Schema
-- Adapted from food recipe structure for financial house management

-- Core House "Recipes" - Templates for house creation and management
CREATE TABLE IF NOT EXISTS house_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Family', 'Business', 'Investment', 'Legacy', 'Merger')),
    short_description TEXT NOT NULL,
    long_description TEXT,
    founding_principles TEXT, -- Like ingredients
    governance_rules TEXT, -- Like cooking directions
    image_path TEXT,
    image_alt TEXT,
    setup_time TEXT,
    maturity_period TEXT,
    complexity_level TEXT CHECK (complexity_level IN ('Simple', 'Intermediate', 'Advanced', 'Expert'))
);

-- Financial "Recipes" - Transaction templates and investment strategies
CREATE TABLE IF NOT EXISTS financial_strategies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Investment', 'Savings', 'Business', 'Real Estate', 'Tax')),
    short_description TEXT NOT NULL,
    long_description TEXT,
    required_resources TEXT, -- Like ingredients
    implementation_steps TEXT, -- Like directions
    image_path TEXT,
    image_alt TEXT,
    prep_time TEXT,
    execution_time TEXT,
    risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High', 'Very High'))
);

-- Governance "Recipes" - Veto and merger procedures
CREATE TABLE IF NOT EXISTS governance_protocols (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Veto', 'Merger', 'Election', 'Dispute', 'Succession')),
    short_description TEXT NOT NULL,
    long_description TEXT,
    conditions_required TEXT, -- Like ingredients
    procedural_steps TEXT, -- Like directions
    image_path TEXT,
    image_alt TEXT,
    preparation_time TEXT,
    resolution_time TEXT,
    difficulty_level TEXT CHECK (difficulty_level IN ('Easy', 'Moderate', 'Challenging', 'Complex'))
);

-- House "Recipes" - Actual house instances following templates
CREATE TABLE IF NOT EXISTS houses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_id INTEGER,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT,
    founding_principles TEXT,
    governance_rules TEXT,
    image_path TEXT,
    image_alt TEXT,
    setup_time TEXT,
    maturity_period TEXT,
    complexity_level TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES house_templates(id)
);

-- Insert House Templates (like recipes)
INSERT INTO house_templates (
    name, category, short_description, long_description,
    founding_principles, governance_rules, image_path, image_alt,
    setup_time, maturity_period, complexity_level
)
VALUES
    (
        'Anderson Dynasty Template',
        'Family',
        'Multi-generational family house focused on financial prosperity and unity.',
        'The Anderson Dynasty template establishes a comprehensive family financial ecosystem where every transaction is recorded, contributions are tracked, and wealth is preserved across generations.',
        '1 Founder with ultimate authority\n1 President for daily operations\nTransparent financial recording\nContribution-based scoring\n64% majority for major decisions\nQuarterly performance reviews\nGenerational wealth preservation focus',
        'Founder establishes house rules and vision\nPresident enforces rules and manages operations\nAll transactions require double verification\nVeto system with 9 conditions for member removal\nHouse mergers require dual-founder approval\nComplete audit trail maintained\nNet time value calculations for sustainability',
        'images/house-family.webp',
        'Multi-generational family gathered around financial planning table',
        '2-4 weeks',
        '2-3 generations',
        'Intermediate'
    ),
    (
        'Business Alliance Template',
        'Business',
        'Professional house focused on business investments and growth.',
        'The Business Alliance template creates a house structure optimized for managing multiple business entities, investments, and professional partnerships with clear profit-sharing and governance mechanisms.',
        'Business-focused governance structure\nProfit and loss tracking per entity\nProfessional contribution scoring\nEquity-based voting weights\nAnnual business performance reviews\nSuccession planning for business roles',
        'Business decisions require 75% approval\nQuarterly financial reporting mandatory\nEquity stakes determine voting power\nBusiness valuation conducted annually\nMerger decisions require founder + majority approval\nProfessional conduct standards enforced\nBusiness continuity planning required',
        'images/house-business.webp',
        'Business partners reviewing financial reports and investments',
        '4-6 weeks',
        '5-10 years',
        'Advanced'
    ),
    (
        'Investment Consortium Template',
        'Investment',
        'Investment-focused house for portfolio management and wealth growth.',
        'The Investment Consortium template provides a specialized structure for managing diverse investment portfolios, risk assessment, and wealth accumulation strategies with professional investment governance.',
        'Investment committee structure\nRisk assessment protocols\nPortfolio diversification requirements\nPerformance-based contribution scoring\nQuarterly investment reviews\nProfessional investment standards',
        'Investment decisions require committee approval\nRisk limits strictly enforced\nPortfolio rebalancing quarterly\nPerformance benchmarks mandatory\nTransparency in all investment decisions\nProfessional fiduciary standards\nAudit trails for all investment transactions',
        'images/house-investment.webp',
        'Investment committee analyzing portfolio performance charts',
        '6-8 weeks',
        '7-15 years',
        'Expert'
    );

-- Insert Financial Strategies (like recipes)
INSERT INTO financial_strategies (
    name, category, short_description, long_description,
    required_resources, implementation_steps, image_path, image_alt,
    prep_time, execution_time, risk_level
)
VALUES
    (
        'Generational Wealth Preservation',
        'Investment',
        'Long-term strategy for preserving and growing family wealth across generations.',
        'This strategy focuses on diversified investments, tax optimization, and structured inheritance planning to ensure wealth preservation across multiple generations while maintaining family unity.',
        'Initial capital of $100,000+\nDiversified investment portfolio\nTax planning expertise\nLegal counsel for estate planning\nFamily governance structure\nRegular financial education\nTrust and estate planning tools',
        'Establish family investment committee\nCreate diversified portfolio (60% equities, 30% bonds, 10% alternatives)\nSet up generation-skipping trusts\nImplement tax optimization strategies\nCreate annual family financial education program\nReview and rebalance quarterly\nUpdate estate plan every 3-5 years',
        'images/strategy-wealth.webp',
        'Family reviewing multi-generational wealth preservation plan',
        '3-6 months',
        'lifelong',
        'Low'
    ),
    (
        'Business Expansion Protocol',
        'Business',
        'Systematic approach to scaling family businesses while maintaining control.',
        'The Business Expansion Protocol provides a structured methodology for growing family businesses through strategic acquisitions, organic growth, and market expansion while preserving family control and values.',
        'Strong existing business base\nCapital reserves for expansion\nManagement team structure\nMarket analysis capabilities\nLegal and compliance support\nPerformance monitoring systems\nSuccession planning framework',
        'Conduct market opportunity analysis\nDevelop expansion business plan\nSecure financing through house resources\nEstablish management structure for new operations\nImplement performance monitoring systems\nCreate integration protocols for acquisitions\nReview expansion results quarterly',
        'images/strategy-business.webp',
        'Business team planning expansion strategy around conference table',
        '6-12 months',
        '2-5 years',
        'Medium'
    ),
    (
        'Real Estate Portfolio Builder',
        'Real Estate',
        'Gradual accumulation of income-producing real estate assets.',
        'This strategy focuses on building a diversified real estate portfolio that generates steady cash flow while appreciating in value, using house capital and professional property management.',
        'Initial capital $50,000+\nProperty management expertise\nReal estate market knowledge\nLegal support for transactions\nProperty maintenance network\nFinancing relationships\nRisk assessment framework',
        'Identify target markets and property types\nEstablish investment criteria\nBuild professional network (agents, managers, contractors)\nAcquire first property within 6 months\nImplement professional management\nReinvest cash flow into additional properties\nDiversify across property types and locations',
        'images/strategy-realestate.webp',
        'Real estate portfolio with residential and commercial properties',
        '2-4 months',
        '10-20 years',
        'Medium'
    );

-- Insert Governance Protocols (like recipes)
INSERT INTO governance_protocols (
    name, category, short_description, long_description,
    conditions_required, procedural_steps, image_path, image_alt,
    preparation_time, resolution_time, difficulty_level
)
VALUES
    (
        '9-Condition Veto Protocol',
        'Veto',
        'Comprehensive member removal system with 9 specific conditions.',
        'The 9-Condition Veto Protocol provides a fair and thorough process for removing problematic house members while protecting house integrity and ensuring due process.',
        'Target member must be in house\nNegative contribution value proven\n3 prior warnings documented\n50%+ member agreement\nAsset depletion evidence\nVision misalignment proof\nFounder consent obtained\nRule violations documented\nFormal veto date set',
        'Document all 9 conditions with evidence\nSubmit veto proposal to house members\nFounder reviews and gives consent\nHouse members vote (50%+ required)\nFormal notification to target member\nSet veto implementation date\nExecute veto and update member status\nRecord all actions in audit log',
        'images/protocol-veto.webp',
        'Governance committee reviewing veto proposal documentation',
        '2-4 weeks',
        '1-2 months',
        'Challenging'
    ),
    (
        'House Merger Framework',
        'Merger',
        'Structured process for merging two houses while preserving value.',
        'The House Merger Framework provides a comprehensive protocol for combining two houses, including asset consolidation, governance integration, and cultural alignment procedures.',
        'Both house founder approval\nMember majority support in both houses\nFinancial audit completed\nLegal structure determined\nGovernance integration plan\nAsset valuation completed\nCultural compatibility assessment\nTimeline and milestones defined\nContingency plans established',
        'Initiate merger discussions between founders\nConduct due diligence on both houses\nPrepare financial statements and asset valuations\nDevelop merger terms and governance structure\nPresent proposal to both house memberships\nConduct votes in both houses (64%+ required)\nExecute legal merger process\nIntegrate systems and operations\nMonitor merger success for 12 months',
        'images/protocol-merger.webp',
        'Leaders from two houses signing merger agreement',
        '2-3 months',
        '6-12 months',
        'Complex'
    ),
    (
        'Founder Succession Protocol',
        'Succession',
        'Orderly transfer of founder role to next generation.',
        'The Founder Succession Protocol ensures smooth transition of leadership from one generation to the next while maintaining house values and operational continuity.',
        'Current founder willing to transfer\nQualified successor identified\nSuccessor training completed\nHouse members support transition\nLegal documentation prepared\nFinancial arrangements finalized\nCommunication plan developed\nTrial period completed\nFormal transfer ceremony planned',
        'Identify and groom potential successors\nCreate successor training program\nDocument all founder knowledge and processes\nPrepare legal transfer documents\nCommunicate transition plan to house members\nConduct trial period with successor in acting role\nFormal vote of confidence from house members\nExecute formal transfer of authority\nCelebrate succession and document transition',
        'images/protocol-succession.webp',
        'Current founder passing leadership symbol to successor',
        '6-12 months',
        '3-6 months',
        'Moderate'
    );

-- Create views for easy access to "recipes"
CREATE VIEW IF NOT EXISTS house_recipe_book AS
SELECT 
    ht.id,
    ht.name as recipe_name,
    ht.category,
    ht.short_description,
    ht.long_description,
    ht.founding_principles as ingredients,
    ht.governance_rules as directions,
    ht.setup_time as prep_time,
    ht.maturity_period as cook_time,
    ht.complexity_level as difficulty,
    COUNT(h.id) as times_used
FROM house_templates ht
LEFT JOIN houses h ON ht.id = h.template_id
GROUP BY ht.id;

CREATE VIEW IF NOT EXISTS financial_recipe_book AS
SELECT 
    fs.id,
    fs.name as recipe_name,
    fs.category,
    fs.short_description,
    fs.long_description,
    fs.required_resources as ingredients,
    fs.implementation_steps as directions,
    fs.prep_time,
    fs.execution_time as cook_time,
    fs.risk_level as difficulty
FROM financial_strategies fs;

CREATE VIEW IF NOT EXISTS governance_recipe_book AS
SELECT 
    gp.id,
    gp.name as recipe_name,
    gp.category,
    gp.short_description,
    gp.long_description,
    gp.conditions_required as ingredients,
    gp.procedural_steps as directions,
    gp.preparation_time as prep_time,
    gp.resolution_time as cook_time,
    gp.difficulty_level as difficulty
FROM governance_protocols gp;

-- Add sample house instances using templates
INSERT INTO houses (
    template_id, name, category, short_description, long_description,
    founding_principles, governance_rules, image_path, image_alt,
    setup_time, maturity_period, complexity_level
)
SELECT 
    id, 'Anderson Dynasty', 'Family', 
    'Multi-generational family house focused on financial prosperity and unity.',
    'The Anderson Dynasty implements comprehensive family financial management with transparent transactions, contribution scoring, and generational wealth preservation.',
    founding_principles, governance_rules, image_path, image_alt,
    setup_time, maturity_period, complexity_level
FROM house_templates 
WHERE name = 'Anderson Dynasty Template';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_house_templates_category ON house_templates(category);
CREATE INDEX IF NOT EXISTS idx_financial_strategies_category ON financial_strategies(category);
CREATE INDEX IF NOT EXISTS idx_governance_protocols_category ON governance_protocols(category);
CREATE INDEX IF NOT EXISTS idx_houses_template ON houses(template_id);
CREATE INDEX IF NOT EXISTS idx_houses_category ON houses(category);
