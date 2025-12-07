## WIP

* add documentation
  * add a README with installation instructions, usage, etc.
    * disclaimer this is a proof-of-concept / demo
    * how to run it locally
    * how to deploy it to production -> TBD
    * how to use the admin interface
    * how the routes and templating works

## TODO

* check/cleanup the dependencies in the package.jsons

* header navigation responsive, currently it breaks on smaller width

* a way to submit forms
  this is needed for the contact page, and also to register a repair and another
  one to register a donation

* how to best handle req.. properties in typescript?

* upload and manage images

* manage users

* delete entries

* dark mode

* increase timeout of session cookie
  currently you get logged out after 24 hours I think, even when you're currently using the system,
  which is kind of bad

* timeout after wrong login

* make the database and route configurable


## DONE

* break out into separate directory

* how to bundle tailwind for production?
  currently I'm just using Play CDN for development
  => we use the tailwind CLI, to create an output CSS
     the CLI scans the files and generates the output accordingly

     `npx tailwindcss -i ./tailwind-input.css -o ./static/tailwind.css`

     added the command to `npm run devtw`
