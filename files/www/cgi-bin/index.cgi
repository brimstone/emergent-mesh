#!/bin/ash

HOST=$(uci get system.@system[0].hostname)

header(){
echo "Content-type: text/html"
echo
cat <<EOF
<!DOCTYPE HTML>
<html>
<head>

<title>Emergent Mesh</title>
<link type="text/css" rel="stylesheet" href="/css/bootstrap.min.css" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style type="text/css">

      /* Sticky footer styles
      -------------------------------------------------- */

      html,
      body {
        height: 100%;
        /* The html and body elements cannot have any padding or margin. */
      }

	#wrap > .container {
	padding-top: 60px;
	}

      /* Wrapper for page content to push down footer */
      #wrap {
        min-height: 100%;
        height: auto !important;
        height: 100%;
        /* Negative indent footer by it's height */
        margin: 0 auto -60px;
      }

      /* Set the fixed height of the footer here */
      #push,
      #footer {
        height: 60px;
      }
      #footer {
        background-color: #f5f5f5;
      }

      /* Lastly, apply responsive CSS fixes as necessary */
      @media (max-width: 767px) {
        #footer {
          margin-left: -20px;
          margin-right: -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
</style>

</head>
<body>

<div id="wrap">
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container">
			<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="brand" href="/">Emergent Node $HOST</a>
			<div class="nav-collapse collapse">
				<ul class="nav">
					<li class="active"><a href="/">Home</a></li>
					<li><a href="/about/">About</a></li>
					<li><a href="/contact/">Contact</a></li>
					<li><a href="/board/">Message Board</a></li>
					<li><a href="/chat/">Chat</a></li>
					<li><a href="/wiki/">Resources</a></li>
					<li><a href="/admin/">Admin</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Nothing<b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="#">Action</a></li>
							<li><a href="#">Another action</a></li>
							<li><a href="#">Something else here</a></li>
							<li class="divider"></li>
							<li class="nav-header">Nav header</li>
							<li><a href="#">Separated link</a></li>
							<li><a href="#">One more separated link</a></li>
						</ul>
					</li>
				</ul>
			</div><!--/.nav-collapse -->
		</div>
	</div>
</div>
<div class="container">
EOF
}
footer() {
cat << EOF

	<hr>
</div> <!-- /container -->
<div id="push"></div>
</div> <!-- /wrap -->

<div id="footer">
	<div class="container">
		<p class="muted credit">2013 GPL?</p>
	</div>
</div>

<script src="/js/jquery-1.9.1.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
</body>
</html>
EOF
}

url=$(echo "$QUERY_STRING" | sed -e 's/\.\.//g')
url="${url%%/}"
url="${url##/}"
page="${url%%/*}"

url="${url##$page}"
url="${url##/}"
method="${url%%/*}"

url="${url##$method}"
url="${url##/}"
param="$url"

[ -z "$method" ] && method="index"

if [ -f "/www/views/$page" ]; then
	source "/www/views/$page"
else
	source "/www/views/default"
fi
