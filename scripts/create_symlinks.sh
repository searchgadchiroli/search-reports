#!/bin/ksh

usage() {
	echo "usage: create_symlinks.sh <ReportsDirectory> <LinkDirectory>"
	echo "Creates symlinks for all files with an exension .data in <ReportsDirectory> in the <LinkDirectory>" 
}

if [ $# != 2 ]
then
	echo "Not enough arguments"
	usage
	exit
fi

if [ ! -d "$1" ]
then
	echo "Directory $1 does not exist"
	usage
	exit 1
fi

if [ ! -d "$2" ]
then
	echo "Directory $2 does not exist"
	usage
	exit 1
fi

for file in `find $1 -name *.data`
do 
	jrxmlName=`echo $file | sed -E 's/.*\/(.*.data)/\1.jrxml/g'`; 
	jrxmlFile="${2}/${jrxmlName}"

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
