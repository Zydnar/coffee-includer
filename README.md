# coffee-includer

*With coffee-includer you can finally include files with proper intendation.*

## Installation

```bash
npm install coffee-includer -g
```

## Usage

### Include statements

main.coffee

```coffeescript
foo = ->
  bar()
  #intend include statement according to current scope
  #=include <path/to/file.coffee>
```

file.coffee

```coffeescript
do awsome_things in coding unless
  awsome_things isnt boring
```

output.coffee

```coffeescript
foo = ->
  bar()
  #file.coffee contents is placed, where you need it!
  do awsome_things in coding unless
    awsome_things isnt boring
```

### CLI command

```bash
coffee-includer main.coffee ./build/output.coffee
```

## Looking for gulp plugin?

### See [*gulp-coffee-includer*](https://github.com/Zydnar/coffee-includer-gulp.git)

## License

### MIT