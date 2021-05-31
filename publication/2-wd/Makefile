#prev = /home/ashimura/public_html/www.w3.org/WWW/TR/2020/PR-wot-architecture-20200130/Overview.html
#dest = /home/ashimura/public_html/www.w3.org/WWW/TR/2021/WD-wot-discovery-20210531
orig = orig.html

### For Echidna
#document = https://w3c.github.io/wot-discovery/publication/2-wd/manifest.txt
#decision = https://github.com/w3c/transitions/issues/177
#token = 3464434525dc27e6dd26f06.02444434

tidy:
	tidy -i -m index.html

diff:
	htmldiff.sh ${prev} index.html > diff.html

draft:
	cp ../../index.html .
	cp -R ../../images .
	rm images/README.md

install:
	cp index.html $(dest)/Overview.html
	cp -R images $(dest)

getprev:
	cp $(prev) prev.html

#publish:
#	curl 'https://labs.w3.org/echidna/api/request' --data 'url=$(document)&decision=$(decision)&token=$(token)' > CODE
#	curl 'https://labs.w3.org/echidna/api/request' --data 'url=$(document)&decision=$(decision)&token=$(token)' -d 'dry-run=true' > CODE

check:
	GET http://labs.w3.org/echidna/api/status?id=`cat CODE`

