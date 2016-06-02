This plugin render a folder scaffold with nunjucks and metalsmith

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

```
  this.njkRender(
	  path.resolve('./'),
		'fromPath',
		'toPath',
		{ replaceVar1: 'value1' })
	.then(
		something();
	)
	.catch( (reason) => {
		console.error(reason);
	});
```
