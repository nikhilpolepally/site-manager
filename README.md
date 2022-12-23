
# Site Manager (Construction Support)

Construction Support application is a hybrid mobile application which is used to create construction site details with location details (Longitude & Latitude). It is used to manage the people working at particular site.

It includes functiona likes
Add Site
Add Contact



## 1. Authors

- [@Nikhil Polepally]()

## 2. APPI References

#### Contacts Controller

```http
POST
/api/contacts/create/{sitetoken}/{uuid}

GET
/api/contacts/list/{sitetoken}/{uuid}

DELETE
/api/contacts/delete/{contacttoken}/{uuid}

GET
/api/contacts/view/{contacttoken}/{uuid}

PUT
/api/contacts/update/{contacttoken}/{uuid}
```

#### Site Controller

```http
POST
/api/sites/create/{uuid}

GET
/api/sites/list/{uuid}

DELETE
/api/sites/delete/{sitetoken}/{uuid}

GET
/api/sites/view/{sitetoken}

PUT
/api/sites/update/{sitetoken}/{uuid}
```

## 3. Database Schema
![](https://raw.githubusercontent.com/nikhilpolepally/git-images/main/db%20schema.png)
