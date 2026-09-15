export interface DatabaseProject {
  id: string;
  title: string;
  name: string;
  category: 'PostgreSQL' | 'Database design';
  tags: string[];
  description: string;
  metric: string;
  metricLabel: string;
  style: string;
  diagram: [string, string, string];
  scope: string[];
  demo?: string;
  image?: string;
  imageAlt?: string;
  imageSource?: string;
  imageCaption?: string;
  imageLayout?: 'brand';
}

export const projects: DatabaseProject[] = [
  {
    id: '01', name: 'Deplexo', title: 'From system design to recovery.',
    category: 'PostgreSQL', tags: ['MySQL', 'PostgreSQL', 'InnoDB Cluster', 'DC / DR'],
    description: 'Designed Deplexo’s system architecture and PostgreSQL database, including DC / DR. Also built MySQL InnoDB clustering, handled MySQL migration work, and optimized slow queries across the platform.',
    metric: 'Deplexo', metricLabel: 'MySQL & PostgreSQL · system architecture', style: 'deplexo',
    diagram: ['SYSTEM DESIGN', 'POSTGRESQL', 'DC / DR'],
    scope: [
      'Complete system design and PostgreSQL database design.',
      'Data-center (DC) and disaster-recovery (DR) design and setup.',
      'MySQL InnoDB Cluster setup and MySQL database migrations.',
      'Slow-query investigation and optimization for application workloads.',
    ],
    demo: 'https://deplexo.com',
    image: '/projects/deplexo.png', imageAlt: 'Official Deplexo app-hosting brand image',
    imageSource: 'https://deplexo.com', imageCaption: 'Official Deplexo preview',
  },
  {
    id: '02', name: 'Savanna Fibre', title: 'A database built for the business.',
    category: 'Database design', tags: ['MySQL', 'InnoDB Cluster', 'Migration', 'Query tuning'],
    description: 'Designed Savanna Fibre’s complete database, implemented MySQL InnoDB clustering, and handled MySQL migrations. Optimized slow queries and supported the database through production operations.',
    metric: 'Savanna Fibre', metricLabel: 'Database design · clustering · migration', style: 'savanna',
    image: '/projects/savanna-fibre.jpg', imageAlt: 'Savanna Fibre’s official SavWifi promotional image',
    imageSource: 'https://savannafibre.com', imageCaption: 'Official Savanna Fibre / SavWifi imagery',
    diagram: ['DATA MODEL', 'SCHEMA DESIGN', 'QUERY TUNING'],
    scope: [
      'Ownership of the complete database design.',
      'MySQL InnoDB Cluster setup and high-availability administration.',
      'MySQL migration workflows and post-migration validation.',
      'Database schema design to support application data requirements.',
      'Slow-query analysis and optimization.',
    ],
  },
  {
    id: '03', name: 'Savbill', title: 'Designed carefully. Tuned in practice.',
    category: 'Database design', tags: ['MySQL', 'InnoDB Cluster', 'Migration', 'Performance'],
    description: 'Designed the complete Savbill database, built its MySQL InnoDB clustering, and carried out MySQL migration work. Investigated and optimized slow queries for application performance.',
    metric: 'Savbill', metricLabel: 'Complete database design · query optimization', style: 'savbill',
    image: '/projects/savbill.webp', imageAlt: 'Savanna Fibre’s official SavGo payment app preview', imageLayout: 'brand',
    imageSource: 'https://savannafibre.com/how-to-pay/', imageCaption: 'Savanna Fibre app imagery',
    diagram: ['DATA MODEL', 'SCHEMA DESIGN', 'QUERY TUNING'],
    scope: [
      'Ownership of the complete database design.',
      'MySQL InnoDB Cluster setup and high-availability administration.',
      'MySQL migration workflows and post-migration validation.',
      'Data modeling and schema design for the application.',
      'Investigation and optimization of slow SQL queries.',
    ],
  },
  {
    id: '04', name: 'Savmoney', title: 'Structure that supports performance.',
    category: 'Database design', tags: ['MySQL', 'InnoDB Cluster', 'Migration', 'Query tuning'],
    description: 'Designed the complete Savmoney database, implemented MySQL InnoDB clustering, and handled MySQL migrations alongside production database administration and slow-query optimization.',
    metric: 'Savmoney', metricLabel: 'Complete database design · query optimization', style: 'savmoney',
    image: '/projects/savmoney.png', imageAlt: 'Savanna Fibre’s official giraffe mascot with a phone and mobile payment artwork', imageLayout: 'brand',
    imageSource: 'https://savannafibre.com/how-to-pay/', imageCaption: 'Savanna Fibre payment imagery',
    diagram: ['DATA MODEL', 'SCHEMA DESIGN', 'QUERY TUNING'],
    scope: [
      'Ownership of the complete database design.',
      'MySQL InnoDB Cluster setup and high-availability administration.',
      'MySQL migration workflows and post-migration validation.',
      'Schema design and application data modeling.',
      'Slow-query investigation and performance optimization.',
    ],
  },
];

export const operations = [
  {
    title: 'High availability & cluster recovery',
    tools: 'MySQL 8.x · InnoDB Cluster · Group Replication · MySQL Router',
    summary: 'Cluster health, member recovery, routing, and production continuity.',
    detail: 'Administer multi-node MySQL environments, monitor member states, investigate replication and connectivity issues, and recover or rejoin instances with MySQL Shell. Evaluate incremental recovery and clone-based provisioning according to instance state and data consistency.',
    practices: ['MySQL Shell cluster administration', 'Replication and member-state checks', 'Node recovery and synchronization', 'DC / DR operations and post-recovery validation'],
  },
  {
    title: 'Parallel backups, restores & disaster recovery',
    tools: 'MySQL Shell · Dump / load utilities · zstd · Bash · Cron',
    summary: 'Automated backups with a practical path back to a working database.',
    detail: 'Build backup and restore workflows with util.dumpInstance(), util.dumpSchemas(), and util.loadDump(). Use parallel threads and zstd compression for large environments, automate execution with Bash and Cron, and validate dump contents, schemas, and restore results.',
    practices: ['Full instance and schema-level dumps', 'Parallel load and controlled restore options', 'Backup transfer and Docker-based tooling', 'Restore validation and recovery procedures'],
  },
  {
    title: 'Slow-query investigation & performance tuning',
    tools: 'pt-query-digest · Slow Query Log · EXPLAIN · Performance Schema',
    summary: 'Measure the workload, identify expensive access patterns, then tune.',
    detail: 'Configure slow-query logging and analyze execution time, frequency, concurrency, rows examined, and rows sent. Investigate workloads with tens of thousands of queries and billions of rows examined, using execution plans and index analysis to guide optimization.',
    practices: ['Slow-log configuration and workload summaries', 'Execution-plan and index analysis', 'Deadlocks, locking contention, and resource bottlenecks', 'Findings translated into actionable technical reports'],
  },
  {
    title: 'Capacity, retention & large-table maintenance',
    tools: 'Information Schema · RANGE partitioning · Stored procedures · MySQL Events',
    summary: 'Understand growth before it becomes a storage incident.',
    detail: 'Track database and table growth, data/index size, row counts, and disk utilization across environments. Work with 100M+ record tables, develop batch cleanup procedures, and apply retention and date-based RANGE partitioning strategies for growing operational data.',
    practices: ['Historical growth comparisons and capacity reports', 'Controlled batch deletion and approved truncation', 'Partition lifecycle and scheduled maintenance', 'Dependency checks, MOPs, approvals, and post-change validation'],
  },
  {
    title: 'Database migrations, synchronization & validation',
    tools: 'MongoDB → MySQL / PostgreSQL · Python · CSV · SQL',
    summary: 'Move data with explicit mappings and checks on both sides.',
    detail: 'Execute migrations involving schema transformation, field mapping, type conversion, reconciliation, and integrity verification. Use mongoexport, Pandas, PyMongo, and PyMySQL for CDR transformations and bulk-import workflows; validate selected-table synchronization before and after execution.',
    practices: ['Source-to-target schema and field mapping', 'MySQL-compatible CSV generation and bulk loading', 'Data reconciliation and integrity verification', 'Customer, package, and service data synchronization'],
  },
  {
    title: 'Monitoring, automation & production analysis',
    tools: 'Grafana · Prometheus · Python · Polars / Pandas · Linux · Docker',
    summary: 'Repeatable operational checks and reports people can act on.',
    detail: 'Automate recurring backups, maintenance, and operational checks with Bash, MySQL Shell JavaScript, Python, and Cron. Build Grafana dashboards and analyze large exported datasets for session counts, customer usage, anomalies, and data quality. Help design a client analytics tool with dashboard and visualization capabilities similar to Grafana. Prepare database reports for application teams, management, and CTO reviews.',
    practices: ['Health, storage, and growth monitoring', 'Chunked exports and large CSV analysis', 'Client analytics tool design and Grafana-style dashboards',
      'Root-cause analysis and incident reporting', 'Repeatable scripts and documented maintenance workflows'],
  },
];

export const skillGroups = [
  {title: 'Database platforms', items: 'MySQL 8.x · PostgreSQL · MongoDB · Firebase · SQLite · InnoDB · SQL'},
  {title: 'Availability & recovery', items: 'InnoDB Cluster · Group Replication · MySQL Router · MySQL Shell · DC / DR · Parallel dump / load · zstd'},
  {title: 'Performance & lifecycle', items: 'pt-query-digest · EXPLAIN · Performance Schema · Information Schema · Partitioning · Stored procedures · MySQL Events'},
  {title: 'Automation & observability', items: 'Bash · Python · Polars · Pandas · Cron · Docker · Linux / Ubuntu · Grafana · Prometheus'},
];

export const experience = [
  {
    date: 'NOV 2025 — PRESENT', role: 'Database Engineer / Database Administrator',
    company: 'Keyanna Technology', location: 'Ahmedabad, India',
    description: 'Manage 24+ production MySQL databases across India, Kenya, Tanzania, and Uganda, supporting transactional, billing, Radius, CDR, audit, notification, workflow, and customer-management workloads.',
    highlights: [
      'Design databases, implement InnoDB clustering, and deliver MySQL migrations across Deplexo, Savanna Fibre, Savbill, and Savmoney.',
      'Administer replication, InnoDB Cluster, routing, DC / DR, failover, and recovery operations.',
      'Help design a client analytics tool with Grafana-like dashboards, alongside Grafana monitoring and reporting.',
      'Investigate slow queries, locking contention, replication issues, storage exhaustion, and production incidents.',
      'Automate backups, restores, maintenance, monitoring, and reports with Bash, Cron, Python, and MySQL Shell.',
      'Work with 100M+ record datasets on schema integrity, partitioning, growth analysis, retention, and controlled cleanup.',
      'Execute MongoDB-to-MySQL and MongoDB-to-PostgreSQL migrations with reconciliation and integrity validation.',
    ],
  },
];

export const freelanceServices = ['Database design & architecture', 'Slow-query & performance tuning', 'Migration & data lifecycle', 'Backup, recovery & availability'];
