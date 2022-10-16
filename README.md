# ANGULAR for PLANNING

Presented software constitutes a front-end view for Planning application. Provides a variety of tools to manage your
fleet of carriers,
and their fleet vehicle, as well as register new users and magae them as well. In future releases I aim to provide
useful tool providing
logs, allowing to se what changes was done by whom. Another goal I aim is to provide 'favorites view', allowing to see
only selected trucks.

## VERSION LOG

-1.0.0 Initial version providing basic operations.

## Registration and users

Due to sensitive nature of data stored in presented application. Registration of new users is only possible by admin.
Application is provided with one admin account, making it possible. Once you log in as an admin, select settings
available
under your name in navbar, on the top-right of the screen. You can manage users and their roles in the user tab - simply
select desired user and make changes.

## Main view

Core part of presented application. From there you can see your carrier grouped with their own trucks. This wiev
provides basic information about carrier, if you wish to see more, simply click carrier's name and you will be directed
to their view.
Same applies to truck, tautliner and truck driver. You can click 'copy' button on the right to copy all the information
about truck.
In the top-right corner there is an 'edit' switch. Triggering it wil enable 'edit' button, that allow you to change
truck driver and trailer from convenient drop-down list. From there a few rules applies:

- only drivers of relative carrier are visible,
- all the tautliners of relative carrier are visible,
- there are also organization's tautliners available, however only these, which doesn't have truck coupled, so it
  prevents
  to uncouple it at another haulier. If you wish to switch such trailer, however you have to uncouple it first.
- selecting tautliner or driver already coupled to another truck will uncouple them.

## Adding new data

You can add new data in their respective views. So to register new carrier, simply view the 'carriers' tab. From '
tautliners' you can add new organization's tautliner only. If you wish to add another trailer or truck, or driver you have to do this within 
related carrier view- from there select desired action from action list.
