db_user=$1
db_password=$2
mysql_root=/usr/local/mysql/bin

java -jar ../lib/liquibase.jar --classpath="../lib/mysql-connector-java-5.1.22-bin.jar" --driver=com.mysql.jdbc.Driver --url="jdbc:mysql://localhost:3306/openmrs" --changeLogFile="../db/liquibase.xml" --username="${db_user}" --password="${db_password}" update
