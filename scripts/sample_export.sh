#Export data from your repository
BUILDOMATIC_ROOT=$1

usage() {
	echo "Make sure that you are running the script from the 'scripts' folder. Paths are relative!"
	echo "Usage: sample_export.sh <BUILDOMATIC_HOME>"
}


if [ "${BUILDOMATIC_ROOT}a" = "a" ]
then
	echo "Please specify BUILDOMATIC_HOME"
	usage
	exit 1
fi

${BUILDOMATIC_ROOT}/js-export.sh --output-dir ../jasperRepository --everything
