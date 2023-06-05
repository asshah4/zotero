<!------ (1) Initialize the URL for the web server ------>
OAS_url = 'http://oasc12029.247realmedia.com/RealMedia/ads/';

<!------ (2) Initialize the site/page (uncomment your choice, and  ------>
<!------ (3) comment out the one you are not using ------>
//OAS_sitepage = 'www.jneurosci.org/homepage';
OAS_sitepage = window.location.hostname + window.location.pathname;
OAS_sitepage = OAS_sitepage.replace(/^(alpha|beta|content|dev|staging)\./, "www.");

if (window.location.pathname == "/") {
	OAS_sitepage = OAS_sitepage + "homepage";
}

<!------ (4) Initialize the list of positions ------>
OAS_listpos = 'Top,Right';

<!------ (5) Initialize the query ------>
OAS_query = '';

<!------ (6) Initialize the query ------>
OAS_target = '_top';
//end of configuration

<!------ (7) Initialize the version of JavaScript to 10 ------>
OAS_version = 10;

<!------ (8) Initialize and calculate the random number (next two lines) ------>
OAS_rn = new String (Math.random()); OAS_rns = OAS_rn.substring (2, 11);

<!------ (9) Set the function: OAS_NORMAL ------>
function OAS_NORMAL(pos) {
document.write('<A HREF="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" TARGET=' + OAS_target + '>'); document.write('<IMG SRC="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" BORDER=0></A>');
}

<!------ (10) Initialize the version of JavaScript to 11 ------>
OAS_version = 11;

<!------ (11) Set the version of JavaScript to 10 ------>
<!------ for a Browser 'Mozilla/3' on webTV ------>
if ((navigator.userAgent.indexOf('Mozilla/3') != -1) || (navigator.userAgent.indexOf('Mozilla/4.0 webTV') != -1))
OAS_version = 10;

<!------ (12) Call the delivery with the MJX code with all positions ------>
if (OAS_version >= 11)
document.write('<SCR' + 'IPT LANGUAGE=JavaScript1.1 SRC="' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' +
OAS_listpos + '?' + OAS_query + '"><\/SCRIPT>');


document.write('');
<!------ (14) Function OAS_AD to display the banner ------>
function OAS_AD(pos) {
if (OAS_version >= 11)
OAS_RICH(pos);
else
OAS_NORMAL(pos);

}
