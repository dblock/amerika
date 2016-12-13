# Contributing to Amerika

The Mom Alexa skill is built with [alexa-app](https://www.npmjs.com/package/alexa-app). For development purposes it's hosted inside an [alexa-app-server](https://github.com/matt-kruse/alexa-app-server).

You're encouraged to submit [pull requests](https://github.com/dblock/amerika/pulls), [propose features and discuss issues](https://github.com/dblock/amerika/issues).

In the examples below, substitute your Github username for `contributor` in URLs.

### Fork the Project

Fork the [project on Github](https://github.com/dblock/amerika) and check out your copy.

```
git clone https://github.com/contributor/amerika.git
cd amerika
git remote add upstream https://github.com/dblock/amerika.git
```

### Run Tests

Ensure that you can build the project and run tests.

```
make test
```

### Run the Alexa Server

```
make s
```

Browse to http://localhost:8080. It should say `Mom`.

Navigate to http://localhost:8080/alexa/amerika and try the Alexa simulator.

## Contribute Code

### Create a Topic Branch

Make sure your fork is up-to-date and create a topic branch for your feature or bug fix.

```
git checkout master
git pull upstream master
git checkout -b my-feature-branch
```

### Write Tests

Try to write a test that reproduces the problem you're trying to fix or describes a feature that you want to build. Tests live under [test/functions](test/functions).

We definitely appreciate pull requests that highlight or reproduce a problem, even without a fix.

### Write Code

Implement your feature or bug fix. The majority of the work is done in the Mom skill in [fuctions/amerika](functions/amerika).

Make sure that `make test` completes without errors.

### Write Documentation

Document any external behavior in the [README](README.md).

### Commit Changes

Make sure git knows your name and email address:

```
git config --global user.name "Your Name"
git config --global user.email "contributor@example.com"
```

Writing good commit logs is important. A commit log should describe what changed and why.

```
git add ...
git commit
```

### Push

```
git push origin my-feature-branch
```

### Make a Pull Request

Go to https://github.com/contributor/amerika and select your feature branch. Click the 'Pull Request' button and fill out the form. Pull requests are usually reviewed within a few days.

Add more commits or amend your previous commit with any changes.

```
git commit --amend
git push origin my-feature-branch -f
```

### Rebase

If you've been working on a change for a while, rebase with upstream/master.

```
git fetch upstream
git rebase upstream/master
git push origin my-feature-branch -f
```

### Check on Your Pull Request

Go back to your pull request after a few minutes and see whether it passed muster with Travis-CI. Everything should look green, otherwise fix issues and amend your commit as described above.

### Be Patient

It's likely that your change will not be merged and that the nitpicky maintainers will ask you to do more, or fix seemingly benign problems. Hang on there!

## Thank You

Please do know that we really appreciate and value your time and work. We love you, really.
