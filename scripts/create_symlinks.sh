#!/bin/bash

usage() {
	echo "usage: create_symlinks.sh <ReportsDirectory> <LinkDirectory>"
	echo "Creates symlinks for all files with an exension .data in <ReportsDirectory> in the <LinkDirectory>" 
}

ReportsDirectory=$1
LinkDirectory=$2

if [ "${ReportsDirectory}"a = "a" ]
then
	ReportsDirectory="../jasperRepository/resources/Reports"
fi

if [ "${LinkDirectory}"a = "a" ]
then
	LinkDirectory="../jrxml"
fi
	
if [ ! -d "$ReportsDirectory" ]
then
	echo "Directory $ReportsDirectory does not exist"
	usage
	exit 1
fi

if [ ! -d "$LinkDirectory" ]
then
	echo "Directory $LinkDirectory does not exist"
	usage
	exit 1
fi

for file in `find $ReportsDirectory -name *.data`
do 
	jrxmlName=`echo $file | sed -E 's/.*\/(.*.data)/\1.jrxml/g'`; 
	jrxmlFile="${LinkDirectory}/${jrxmlName}"

	if [ -h "$jrxmlFile" ]
	then
		rm -rf $jrxmlFile
	fi

	#If someone has created a symlink by mistake
	if [ -e "$jrxmlFile" ]
	then
		echo "Did not expect $jrxmlFile"
		exit 1
	fi

	ln -s $file $jrxmlFile
done
