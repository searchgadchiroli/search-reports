#!/bin/sh
TEMP_SCRIPT_DIR=`dirname -- "$0"`
SCRIPT_DIR=`cd $TEMP_SCRIPT_DIR; pwd`
CUSTOM_DIR="${SCRIPT_DIR}/../jasperServerCustomization"
JASPER_HOME=$1
JASPER_MASTER_PROPERTIES="${JASPER_HOME}/buildomatic/default_master.properties"
APP_SERVER_DIR=`cat $JASPER_MASTER_PROPERTIES | grep ^appServerDir | cut -f2 -d"="`

if [ "${JASPER_HOME}a" = "a" ]
then
	echo "Please specify JASPER_HOME as an argument"
	exit 1
fi

cp -v ${CUSTOM_DIR}/applicationContext-security.xml ${APP_SERVER_DIR}/webapps/jasperserver/WEB-INF/applicationContext-security.xml 

cp -v ${CUSTOM_DIR}/actionModel-navigation.xml ${APP_SERVER_DIR}/webapps/jasperserver/WEB-INF/actionModel-navigation.xml

cp -v ${CUSTOM_DIR}/jasperserver_messages.properties ${APP_SERVER_DIR}/webapps/jasperserver/WEB-INF/bundles/jasperserver_messages.properties

cp -v ${CUSTOM_DIR}/actionModel.primaryNavigation.js ${APP_SERVER_DIR}/webapps/jasperserver/scripts/actionModel.primaryNavigation.js

cp -v -R ${CUSTOM_DIR}/mapFlow ${APP_SERVER_DIR}/webapps/jasperserver/WEB-INF/jsp/modules/

cp -v ${CUSTOM_DIR}/docMap*.xml ${APP_SERVER_DIR}/webapps/jasperserver/WEB-INF/flows/

cd ${CUSTOM_DIR}

rm -rf bin

mkdir bin

javac com/jaspersoft/jasperserver/war/maps/MapAction.java -classpath "lib/*" -d bin

jar -cvf bin/jssJasper.jar -C bin com

cp -v bin/jssJasper.jar ${APP_SERVER_DIR}/webapps/jasperserver/WEB-INF/lib 