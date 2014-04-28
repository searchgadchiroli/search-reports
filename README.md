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

__Note__: SEARCH Reports only works with [iReport 4.7.1](http://sourceforge.net/projects/ireport/files/iReport/iReport-4.7.1/). Do not use a newer version of iReport or Jaspersoft Studio.

We are using Jasper Server deployed as a WAR in the Webapps folder of Tomcat. Jasper internally uses a DB to store all configuration, report templates, meta-data, etc and provides with tooling to export / import the reports. In Bahmni, we use MySQL Db as backend for Jasper. 

When we create a report in Jasper using the JasperSoft iReport 4.7.1 tool, we upload the report to the Jasper Reporting Server from _iReport_. Once we are satisfied with the report, then using the export command, we dump all reports from the Jasper server, and check them into the _jasperRepository_ folder. 

The build process imports the contents of the _jasperRepository_ folder into the machine on which deployment is happening.

The main commands used in this process are:

#### Puppet commands
- __`./scripts/run-puppet-module.sh jasperserver`__ : Run this command from bahmni-environment to create the `jasperserver` war file in tomcat. This will create a fresh jasper server instance with no reports or data. This is typically a first-time setup command.
- __`./scripts/run-puppet-module.sh bahmni-jasperreports`__ : Run this command from bahmni-environment to deploy the reports from _jasperRepository_ into `jasperserver` war file. This command will pull the reports from __GITHUB__. This command will typically need to be run on each deployment and internally uses the `js-import.sh` command of Jasper to populate the Jasper DB.

#### Local Scripts
- __EXPORT:__ __`./scripts/sample-export.sh`__ : Wrapper over the `js-export.sh` Jasper command for exporting the whole Japser Database into the _jasperRepository_ folder. This command will overwrite the current _jasperRepository_ folder with appropriate files. 
- __IMPORT:__ __`./scripts/deploy.sh`__ : Wrapper over the `js-import.sh` and `db_deploy.sh` Jasper command for importing all data and reports from _jasperRepository_ folder into `jasperserver` database. Exact command `/deploy.sh -j /usr/local/jasperreports-server-cp-5.0.0-bin -p ../conf/reports_default.properties`
- __LIQUIBASE:__ __`./scripts/db_deploy.sh`__ :  For running liquibase migrations.
- __SYM LINKS:__ __`./scripts/create_symlinks.sh`__ :  For each report in _jasperRepository_, this command creats a shortcut file in _jrxml_ folder.


### Process to follow to publish a report from QA Server
Once you are OK with a report on the QA box, to publish it into GITHUB, follow these steps: 

1. Log onto the box via SSH.
2. Go to search-reports folder on the machine. 
3. Perform a `git pull --rebase` to get latest. 
4. Go to the scripts folder and execute the command: `./sample_export.sh /usr/local/jasperreports-server-cp-5.0.0-bin/buildomatic/`
5. Perform a `git status`. We need to commit 3 files from this list. See this [commit](https://github.com/Bhamni/search-reports/commit/f92e46deabb7dfeccfe900a083dcc7a5c47e64dc) to understand which files need to be added (one .folder.xml, and 2 new ones).
6. Once committed, perform a `git reset --hard` to undo all other changes. 
7. Then, create a symlink jrxml file for future iReport editing using the command (from scripts folder): `create_symlinks.sh`.
8. Commit this symlink file. and 
9. Push the 2 commits to the repository on Github.
10. Trigger the CI pipeline to ensure that everything is OK with reports repository.

Fresh Jasper (For Implementation)
-----------------------------------

The Tag __`Baseline_Jasper`__ can be extracted from this repo to get a Fresh Japser instance for starting out with a new implementation.
