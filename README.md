This repo is (hopefully) the place for my common files.
There should be no CORS problem as they are on the same server :/

The purpose of putting them here is so that I can update a single file
instead of having to retroactively ammend every updated file for every
project I put on here. (which I haven't got round to doing yet...lol)

Not yet sure how I will get webapps to update their cached files,
unless I do a seperate cache for each file, or go back to rolling release
version of SW where if it is online, it re-downloads every file, then
caches/overwrites the cached file with the server's version if different.

hmmmmm how about doing a tiny little file that only has the date of last update,
then get that file, and if the contents are different, update all of the files.
cache name would be the date of update from the little file.
So, hard-code that file somewhere, and take a look at the verison.

Anyway, Check out one of my webapps hosted here on GitHub, for how I've integrated it.


Suggestions, tips/support, etc. welcome:
https://github.com/StewVed/globalscripts/issues


My Webtop and main site:
http://stewved.co.uk


StewVed's standard notice:

Warning: May contain Bugs!
Cannot guarantee Bug free!
Produced on a system where Buggy products are also made!