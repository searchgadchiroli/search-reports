db_host=$1
db_user=$2
db_password=$3
mysql_root=/usr/local/mysql/bin

java -jar ../lib/liquibase.jar --classpath="../lib/mysql-connector-java-5.1.22-bin.jar" --driver=com.mysql.jdbc.Driver --url="jdbc:mysql://${db_host}:3306/openmrs" --changeLogFile="../db/liquibase.xml" --username="${db_user}" --password="${db_password}" update
