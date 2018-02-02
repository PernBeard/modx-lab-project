# modx-lab-project

A modx project involving basic use of resources, templates, chunks, and snippets. 

## Areas of Improvement

Lost some modx system settings when using Gitify to build from dev files. Look into ignoring orphaned system settings -or- use environment variables in Gitify.

Did not properly utilize the foundation 6 style settings file. This could help reduce redundancy and clean up scss files.

Mix of vanilla JS and jQuery in animation script. Either full embrace jQuery for the project or find a polyfill for animations/transitions in IE9.

**fixed** Replace alert notification from signup with vex modal.

**fixed** Slider controls are not positioned correctly on initial page load. jQuery logic is not setting proper height for slide container.

**fixed** Huge issue with resources that were not published breaking functionality in IE.