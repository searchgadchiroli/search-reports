SEARCH Hospital Reports
========================

Report repository for SEARCH specific reports (using Jasper). You can access these reports in Bahmni at the following URL: `http://<IP>:8080/jasperserver`

Folder Structure
-----------------

- __conf__: DB Connection settings. 
- __db__: Liquibase migration file for report specific lookup tables, etc.
- __jasperRepository__: Jasper folder which contains all the reports (exported using the `sample-export.sh` script). 
- __jrxml__ : Shortcuts for each report (generated using the `create_symlinks.sh` script).
- __lib__ : Jars for mysql and liquibase.
- __script__ : Wrapper scripts over jasper scripts.


Working with Jasper
----------------------

We are using Jasper Server deployed as a WAR in the Webapps folder of Tomcat. Jasper internally uses a DB to store all configuration, report templates, meta-data, etc and provides with tooling to export / import the reports. In Bahmni, we use MySQL Db as backend for Jasper. 

When we create a report in Jasper using the [Jaspersoft Studio](http://community.jaspersoft.com/project/jaspersoft-studio) tool, we upload the report to the Jasper Reporting Server from _Jaspersoft Studio_. Once we are satisfied with the report, then using the export command, we dump all reports from the Jasper server, and check them into the _jasperRepository_ folder. 

The build process imports the contents of the _jasperRepository_ folder into the machine on which deployment is happening.

The main commands used in this process are:

#### Puppet commands
- `./scripts/run-puppet-module.sh jasperserver` : Run this command from bahmni-environment to create the `jasperserver` war file in tomcat. This will create a fresh jasper server instance with no reports or data. This is typically a first-time setup command.
- `./scripts/run-puppet-module.sh bahmni-jasperreports` : Run this command from bahmni-environment to deploy the reports from _jasperRepository_ into `jasperserver` war file. This command will pull the reports from __GITHUB__. This command will typically need to be run on each deployment and internally uses the `js-import.sh` command of Jasper to populate the Jasper DB.

#### Local Scripts
- `./scripts/sample-export.sh` : Wrapper over the `js-export.sh` Jasper command for exporting the whole Japser Database into the _jasperRepository_ folder. This command will overwrite the current _jasperRepository_ folder with appropriate files. 
- `./scripts/deploy.sh` : Wrapper over the `js-import.sh` and `db_deploy.sh` Jasper command for importing all data and reports from _jasperRepository_ folder into `jasperserver` database.
- `./scripts/db_deploy.sh` :  For running liquibase migrations.
- `./scripts/create_symlinks.sh` :  For each report in _jasperRepository_, this command creats a shortcut file in _jrxml_ folder.


Fresh Jasper (For Implementation)
-----------------------------------

The Tag `Baseline_Jasper` can be extracted from this repo to get a Fresh Japser instance for starting out with a new implementation.
