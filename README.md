# pdehaan/inclusive-language-lint

A wrapper around the [@11ty/eleventy-plugin-inclusive-language/](https://github.com/11ty/eleventy-plugin-inclusive-language/) plugin with added support for CLI usage, and appending words.

## USAGE

This isn't published to npm, but you can use it via <kbd>npx</kbd> using the following:

```sh
npx pdehaan/inclusive-language-lint '*.md'
```

Results will be logged to STDERR.

If you want to _replace_ the list of potentially problematic words, you can set the `WORDS` env var, like so (on macOS):

```sh
WORDS=obviously npx pdehaan/inclusive-language-lint '*.md'
```

Or if you want to _append_ to the default list of words, you can set the poorly named `WORDS2` env var, behold:

```sh
WORDS2=blacklist,whitelist npx pdehaan/inclusive-language-lint '*.md'
```

## DEBUGGING

Yeah, we got that too! Simply use the `inclusive` debug target (or `DEBUG=*`):

```sh
DEBUG=inclusive WORDS2=blacklist,whitelist npx pdehaan/inclusive-language-lint '*.md' 'docs/**/*.md'
```

### DEBUG OUTPUT

```sh
  inclusive appendWords = [ 'simply', 'obviously', 'basically', 'of course', 'clearly', 'just', 'everyone knows', 'however', 'easy', 'blacklist', 'whitelist' ] +0ms
  inclusive globs = [ '*.md', 'docs/**/*.md' ] +1ms
  inclusive files = [ '/private/tmp/inclusive-language-lint/README.md' ] +3ms
  inclusive files = [] +1ms
```
