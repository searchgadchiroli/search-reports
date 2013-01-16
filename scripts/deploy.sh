#!/bin/sh

TEMP_SCRIPT_DIR=`dirname -- "$0"`
SCRIPT_DIR=`cd $TEMP_SCRIPT_DIR; pwd`
export SCRIPT_DIR

usage() {
	echo "Usage: deploy.sh -j <JASPER_HOME> -p <PROPERTIES_FILE>"
	echo "eg: deploy.sh /home/jss/jasperserver -p ../conf/reportdefault.properties"
	echo "properties file will be defaulted to ../conf/reports_default.properties"
}

while getopts "j:p:" opt; do
	case $opt in 
	j)	JASPER_HOME=`cd $OPTARG; pwd`	;;
	p)	REL_PATH=`dirname $OPTARG`
		ABS_PATH=`cd $REL_PATH; pwd`
		FILENAME=`basename $OPTARG`		
		PROPERTIES_FILE="${ABS_PATH}/${FILENAME}" ;;
	
	esac
done

if [ "${JASPER_HOME}a" = "a" ]
then
	echo "Please specify JASPER_HOME using the -j option)"
	usage
	exit 1
fi
	

if [ "${PROPERTIES_FILE}a" = "a" ]
then
	PROPERTIES_FILE="${SCRIPT_DIR}/../conf/reports_default.properties"
	echo "Properties file not provided. Defaulting to $PROPERTIES_FILE"
fi
export PROPERTIES_FILE

echo "SCRIPTDIR = $SCRIPT_DIR"
echo "JASPER_HOME = $JASPER_HOME"
echo "PROPERTIES_FILE = $PROPERTIES_FILE"

cd $SCRIPT_DIR

#Changing properties
echo "###########################################################################"
echo "Fixing properties files"
echo "###########################################################################"

for file in `ls ${SCRIPT_DIR}/../jasperRepository/resources/Data_Sources/*.xml`
do
	for line in `cat $PROPERTIES_FILE`
	do
		key=`echo $line | cut -f1 -d"="` 
		value=`echo $line | cut -f2 -d"="`
		sed -i -e "s/\${$key}/$value/g" $file
	done
done

echo "###########################################################################"
echo "Deploying reports into Jasper Server"
echo "###########################################################################"
/bin/sh ${JASPER_HOME}/BUILDOMATIC/js-import.sh --input-dir ../jasperRepository --update
if [ $? -ne 0 ]
then
	echo "Failed "
	exit 1
fi


echo "###########################################################################"
echo "Running DB deploy "
echo "###########################################################################"
OPENMRS_DB_HOST=`cat $PROPERTIES_FILE | grep openmrs_dbhost | cut -f2 -d"="`
OPENMRS_DB_USERID=`cat $PROPERTIES_FILE | grep openmrs_username | cut -f2 -d"="`
OPENMRS_DB_PASSWORD=`cat $PROPERTIES_FILE | grep openmrs_password | cut -f2 -d"="`
/bin/sh db_deploy.sh $OPENMRS_DB_HOST $OPENMRS_DB_USERID $OPENMRS_DB_PASSWORD 
if [ $? -ne 0 ]
then
	echo "Failed "
	exit 1
fi


echo "###########################################################################"
echo "Done !!! "
echo "###########################################################################"
