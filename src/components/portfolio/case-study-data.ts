export type CaseStudy = {
  id: string;
  category: string;
  title: string;
  scope: string;
  summary: string;
  tools: string[];
  problem: string;
  investigation: string[];
  action: string[];
  outcome: string;
  validation: string;
  diagram: 'cluster' | 'dual-cluster' | 'flow';
  steps: [string, string][];
  diagramCaption: string;
};

// Public summaries of the owner's supplied experience. Specific client incidents,
// unconfirmed log totals, recovery targets and performance deltas are not invented.
export const caseStudies: CaseStudy[] = [
  {
    id: 'cluster-recovery', category: 'HIGH AVAILABILITY', title: 'Two MySQL clusters. Three shared servers.',
    scope: '3 servers · 6 containers · 2 clusters', summary: 'Built two independent MySQL clusters for different database workloads, with two containers on each of three servers.',
    tools: ['InnoDB Cluster', 'Group Replication', 'MySQL Router', 'MySQL Shell', 'Docker'],
    problem: 'One production environment needed clustered MySQL for two different database workloads on three servers.',
    investigation: ['Inspected cluster topology, member availability, and database connectivity.', 'Assessed the instance state and whether incremental recovery or clone-based provisioning was appropriate.'],
    action: ['Created two MySQL containers per server and grouped the six containers into two independent three-member clusters, each serving a different database workload.', 'Used MySQL Shell cluster administration to recover or rejoin database instances.', 'Coordinated node synchronization with the existing cluster state and checked routing through MySQL Router.'],
    outcome: 'Built and operate two independent MySQL clusters on three shared servers, within an estate that includes five clustered production environments.',
    validation: 'Checked member state, synchronization, and database connectivity following recovery.',
    diagram: 'dual-cluster', steps: [], diagramCaption: 'Two independent replication groups, with one member of each cluster on every server. The clusters share the same three physical hosts.',
  },
  {
    id: 'large-table-analysis', category: 'CAPACITY & GROWTH', title: 'Finding the growth behind 100M+ rows.',
    scope: '100M+ record tables', summary: 'Trace storage pressure back to high-volume Radius, CDR, and audit data, then turn the findings into maintenance priorities.',
    tools: ['MySQL', 'Information Schema', 'Python', 'Polars'],
    problem: 'Large operational tables accumulate historical records and become major contributors to database and disk growth.',
    investigation: ['Compared database snapshots, row counts, data size, and index size to identify growth drivers.', 'Investigated date ranges, customer/session activity, and chunked exports with SQL and Python/Polars.'],
    action: ['Prioritized large tables for retention assessment and controlled maintenance.', 'Prepared capacity reports and cleanup recommendations for technical teams and management.'],
    outcome: 'Identified the tables and historical data responsible for growth, with prioritized capacity and retention recommendations.',
    validation: 'Cross-checked row counts, time ranges, and storage calculations against the source database and expected application behavior.',
    diagram: 'flow', steps: [['Measure', 'Rows · data · indexes'], ['Investigate', 'Dates · sessions · growth'], ['Prioritize', 'Retention · dependencies'], ['Report', 'Capacity recommendations']],
    diagramCaption: 'Investigation workflow used to turn storage measurements into actionable maintenance recommendations.',
  },
  {
    id: 'slow-query-investigation', category: 'PERFORMANCE ENGINEERING', title: 'From slow logs to optimization priorities.',
    scope: '45 MySQL servers', summary: 'Manage slow-query analysis across the server estate using Percona Toolkit, query execution plans, and production workload data.',
    tools: ['pt-query-digest', 'Slow Query Log', 'EXPLAIN', 'Performance Schema'],
    problem: 'Expensive and frequently repeated SQL statements consume resources across business-critical application workloads.',
    investigation: ['Configured slow-query logging and used pt-query-digest to analyze large production logs.', 'Investigated execution time, frequency, concurrency, rows examined, and rows returned across query patterns.'],
    action: ['Reviewed table access patterns, execution plans, and indexing opportunities.', 'Performed MySQL slow-query optimization across Savanna Fibre, Savbill, and Savmoney, and communicated workload findings to stakeholders.'],
    outcome: 'Identified costly query patterns, prioritized optimization work, and delivered query/index recommendations and tuning changes.',
    validation: 'Used workload summaries and execution-plan analysis to assess the queries under investigation.',
    diagram: 'flow', steps: [['Capture', 'Production slow logs'], ['Digest', 'Group query patterns'], ['Investigate', 'EXPLAIN · index access'], ['Prioritize', 'Frequency × query cost']],
    diagramCaption: 'Workload-led investigation: identify the queries that contribute most before selecting an optimization.',
  },
  {
    id: 'backup-recovery', category: 'BACKUP & DISASTER RECOVERY', title: 'A backup is only half the job.',
    scope: 'Hourly · daily · weekly · monthly', summary: 'Manage scheduled backups across production and UAT, plan backup storage, and maintain scripts for repeatable recovery.',
    tools: ['MySQL Shell', 'zstd', 'Bash', 'Cron', 'Docker'],
    problem: 'Large production databases require practical backup and restoration workflows, including handling existing schemas and interrupted restore progress.',
    investigation: ['Checked backup directories, dump contents, schema availability, and the destination database state.', 'Investigated restore issues and selected loading options according to the recovery scenario.'],
    action: ['Operate hourly, daily, weekly, and monthly backup schedules across production and UAT; plan storage and maintain recovery scripts.', 'Used util.dumpInstance() and util.dumpSchemas() with parallel threads and zstd compression, followed by util.loadDump() for restoration.', 'Handled ignoreExistingObjects and resetProgress where appropriate in controlled restores; automated backup scripts with Bash, MySQL Shell JavaScript, Cron, and Docker.'],
    outcome: 'Established recurring backup schedules across production and UAT, with storage planning, parallel restore workflows, and recovery scripts.',
    validation: 'Validated dump contents, restored schemas, and the restore process against the intended recovery scope.',
    diagram: 'flow', steps: [['Source', 'Production MySQL'], ['Dump', 'MySQL Shell · parallel'], ['Compress', 'zstd'], ['Store', 'Backup directory'], ['Transfer', 'Recovery destination'], ['Restore', 'util.loadDump()'], ['Validate', 'Schemas · dump contents']],
    diagramCaption: 'Operational backup/recovery workflow. Parallelism is selected for the environment and workload.',
  },
  {
    id: 'cdr-migration', category: 'DATABASE MIGRATION', title: 'Moving CDR data from MongoDB to MySQL.',
    scope: 'Schema mapping & validation', summary: 'Transform exported call records into a MySQL-compatible dataset, with explicit field mapping and campaign classification.',
    tools: ['mongoexport', 'PyMongo', 'Pandas', 'PyMySQL', 'SQL'],
    problem: 'Source call-record documents and the destination relational schema differ in field names, data types, and structure.',
    investigation: ['Mapped UUID, call duration, call UUID, call start time, and campaign UUID to the target schema.', 'Analyzed related campaign tables to determine campaign types and reviewed destination column definitions.'],
    action: ['Extracted records with mongoexport and built Python transformation workflows using Pandas, PyMongo, and PyMySQL.', 'Generated MySQL-compatible CSV data and used bulk-import workflows with secure_file_priv requirements taken into account.'],
    outcome: 'Built and used a MongoDB-to-MySQL CDR migration workflow covering extraction, transformation, and loading.',
    validation: 'Checked field mappings, destination column alignment, and source/target data before and after loading.',
    diagram: 'flow', steps: [['Extract', 'MongoDB · mongoexport'], ['Map', 'Fields · campaign types'], ['Transform', 'Python · Pandas'], ['Prepare', 'MySQL-compatible CSV'], ['Load', 'MySQL bulk import'], ['Validate', 'Source ↔ target']],
    diagramCaption: 'CDR migration workflow; internal schemas and customer records are omitted.',
  },
  {
    id: 'retention-maintenance', category: 'DATA LIFECYCLE', title: 'Cleaning historical data with control.',
    scope: 'Retention · cleanup · partitioning', summary: 'Control database, log, and audit growth while preserving the monitoring history customers ask to retain.',
    tools: ['SQL', 'Stored Procedures', 'RANGE Partitioning', 'MySQL Events'],
    problem: 'Audit, Radius, CDR, and workflow history continues to grow, while large one-shot deletes can create disruptive transactions.',
    investigation: ['Assessed table size, historical date ranges, foreign-key dependencies, and business retention requirements.', 'Worked with application stakeholders to identify which records or approved tables could be removed.'],
    action: ['Maintain cleanup scripts and storage controls across servers, applying customer-defined log and audit retention requirements.', 'Prepared production MOPs, obtained approvals, and used batch cleanup procedures or approved truncation according to the table’s requirements.', 'Worked with date/time-based RANGE partitioning and evaluated scheduled partition management for longer-term retention.'],
    outcome: 'Executed controlled historical-data cleanup and produced retention and partitioning recommendations for growing tables.',
    validation: 'Monitored remaining record counts and checked database state after maintenance.',
    diagram: 'flow', steps: [['Assess', 'History · dependencies'], ['Plan', 'Retention · MOP'], ['Approve', 'Stakeholder review'], ['Execute', 'Controlled batches'], ['Validate', 'Counts · database state'], ['Maintain', 'Retention · partitions']],
    diagramCaption: 'Production change workflow; cleanup methods depend on application requirements and approval.',
  },
  {
    id: 'online-schema-changes', category: 'PRODUCTION CHANGE MANAGEMENT', title: 'Database changes without downtime.',
    scope: 'Migrations · schemas · tables · columns', summary: 'Own migration and schema-change work, using Percona tooling for online table alterations and controlled validation.',
    tools: ['pt-online-schema-change', 'Percona Toolkit', 'MySQL Shell', 'SQL'],
    problem: 'Production databases need migrations, dumps, and evolving table or column definitions while applications remain available.',
    investigation: ['Reviewed table structures, indexes, foreign-key dependencies, and application requirements before changes.', 'Assessed the required schema or data migration and prepared a controlled production procedure.'],
    action: ['Handled migrations, database dumps, schema modifications, and table/column changes since joining the firm.', 'Used pt-online-schema-change for online table alterations, with documented MOPs, stakeholder approvals, and pre/post-change checks.'],
    outcome: 'Completed the database migrations and schema/table/column changes I have handled since joining the firm without downtime.',
    validation: 'Checked database state, data consistency, and application behavior after changes.',
    diagram: 'flow', steps: [['Assess', 'Schema · dependencies'], ['Plan', 'MOP · approvals'], ['Change', 'Online alteration / migration'], ['Validate', 'Data · application behavior']],
    diagramCaption: 'A record of completed change work since joining; method and validation depend on the specific change.',
  },
];
