This plugin renders a scaffold folder with [nunjucks](https://mozilla.github.io/nunjucks/api.html) and [metalsmith](https://www.metalsmith.io)

### pisco-plugin-nunjucks - njkRender

```
let p = this.njkRender(root, from, to, vars);
```

Where

- *root* is the root directory where origin and destination folder are placed,
- *from* is the origin folder with the scaffold and nunjucks templates,
- *to* is the destination folder,
- *vars* is an object with the vars to be replaced and used in the nunjucks templates.

and returns a Promise.

*Example*:

When the plugin is called like:

```
  this.njkRender(
	  path.resolve('./'),
		'fromPath',
		'toPath',
		{ foo: 'meow' })
	.then(
		something();
	)
	.catch( (reason) => {
		console.error(reason);
	});
```

And exists a file `./fromPath/example.html` with the content:

```
<div>
This is a {{ foo }} cat 
</div>
```

Then a new file `./toPath/example.html` is created:

```
<div>
This is a meow cat 
</div>
```

