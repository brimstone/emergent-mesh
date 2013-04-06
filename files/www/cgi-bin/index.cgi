#!/bin/sh

# global variables
export HOST="$(uci get system.@system[0].hostname)"
export WWWROOT="/www"
export MYNET="$(ip -o addr show dev br-lan | awk '/inet / {print $4}')"
export MYIP="${MYNET%%/*}"

echo "$REMOTE_ADDR - - $(date +"[%d/%b/%Y:%H:%M:%S %z]") \"$REQUEST_METHOD $QUERY_STRING\" \"$HTTP_USER_AGENT\"" >> /tmp/httpd.log

# figure out our page
url=$(echo "$QUERY_STRING" | sed -e 's/\.\.//g')
url="${url%%/}"
url="${url##/}"
export page="${url%%/*}"
# figure out our method
url="${url##$page}"
url="${url##/}"
export method="${url%%/*}"
# figure out our params, if any
url="${url##$method}"
url="${url##/}"
export param="$url"

# if no page, default to index
[ -z "$page" ] && page="index"

# if no method, default to index
[ -z "$method" ] && method="index"

# if we have a page or a view for the page/method
if [ -f "$WWWROOT/pages/$page" -o -f "$WWWROOT/views/$page/$method" ]; then
	if [ "$REQUEST_METHOD" = "POST" ]; then
		read POSTRAW
		export POSTRAW
		if [ "${POSTRAW:0:1}" != "{" ]; then
			eval $(echo "$POSTRAW" | awk -F'&' '{for(i=1;i<=NF;i++){print "export POST_" $i}}')
		fi
	fi
	# build up a tiny driver script
	(
	# source our common functions
	echo "source \"$WWWROOT/includes/functions\""
	# if we have a page, execute it
	[ -e "$WWWROOT/pages/$page" ] && echo "source \"$WWWROOT/pages/$page\""
	# if we have a page/method, execute that with a wrapper
	if [ -e "$WWWROOT/views/$page/$method" ]; then
		echo "source \"$WWWROOT/includes/header\""
		echo "cat << dog"
		cat "$WWWROOT/views/$page/$method"
		echo "dog"
		echo "source \"$WWWROOT/includes/footer\""
	fi) | ash
else
	# else redirect them to the root page and method
	echo "Status: 302 Temporary Redirect"
	echo "Location: /"
fi
