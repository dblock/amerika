# Start the server
s:
	node server.js

# Build
build:
	npm install
	cd functions/amerika && npm install
	cd functions/amerika && node index.js

# Deploy to AWS Lambda
deploy: build
	apex deploy --profile default

# Test
test: build
	./node_modules/mocha/bin/mocha

beautify:
	npm install -g js-beautify
	git ls-files "*.js" | xargs js-beautify -r
	git ls-files "*.json" | xargs js-beautify -r
