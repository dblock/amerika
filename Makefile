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
	apex deploy --profile dblock

# Test
test: build
	./node_modules/mocha/bin/mocha
