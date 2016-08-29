# Andela Inventory Management System
Andela inventory management system
allows Admin to create and manage company assets

## Application use
this app is meant to manage all inventory in andela, ranging from creating ,deletion, assigning of assets to staff members and notification of due date for asset to be returned. only the super  admin has right to assign assets to staff members

## Tools Used
- Node js
- mongo db for database
- git for version control
- heroku for hosting


## folder structure
- public folder : contains all site assets like images and css
- model folder : contains all database models
- controller folder : contains major coders that render the view
- middleware folder : contains logic for authenticating users
- views folder : contains all views(html) been rendered to the user


## Access levels
Role base system where super admin with the role of 1
has the capabilities of creating, editing and deleting
all members of the system. other roles consist of

### Role 2(Admin role)
   - create and assign category to staff members
    - add new asset to the system
   -  get notifications of soon to be returned assets
    - gets notification assets whose return date has pass its actual due date
    - resolve lost and found conflict
    - resolve lost product reports  from other staff members

### Role 3(Staff )
    - if no role is determined by the admin or super admin
    - this role is automatically assigned to the member
    - user with this role are limited to only
    - edit their profile
    - view assets
    - view assets assigned to them
    - and send reports to admin in any case that involves lost of assets

## Authentication
    users login is handle by ['passport'](href='http://passportjs.org/'), a node js module for user authentication. a valid email and password required for authentication



