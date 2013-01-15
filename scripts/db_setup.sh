
db_user=$1
db_password=$2
mysql_root=/usr/local/mysql/bin

$mysql_root/mysql -u $db_user -p$db_password openmrs  < db/create_program_village.sql 
