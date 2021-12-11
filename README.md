
# Study IO API

A RESTful API for Study IO, a learning application.

## Installation

Install the Study IO API dependencies with npm

```bash
  cd api
  npm install
```

To start

```bash
  npm start
```

Study IO requires Postgres. To locally load mock data:

```bash
  Change the filepaths in schema.sql to where your locally stored .csv files are
  In your terminal, run psql -h localhost -f schema.sql
```

Due to security concerns, the Postgres connection string is stored in a config.js file that is not provided. Please make a config.js file using the config.example.js file provided.

## Documentation

[Quick Start Guide For PostgreSQL](https://chartio.com/resources/tutorials/how-to-start-postgresql-server-on-mac-os-x/)<br />
[Mock Data](https://docs.google.com/spreadsheets/d/1pP8pmFDK-arZ6Yv5m1dNQe5gDxmmd9VweVFYvMPET-I/edit?usp=sharing)

## API Reference

#### Get all topics

```http
  GET /topics
```

Response:

```bash
[
    {
        "id": 1,
        "name": "math",
        "url": "https://via.placeholder.com/200x200"
    },
    {
        "id": 2,
        "name": "science",
        "url": "https://via.placeholder.com/200x200"
    },
    ...
]
```

#### Get all rooms

```http
  GET /rooms
```

Response:

```bash
[
    {
        "id": 1,
        "name": "the danger zone",
        "topic_id": 1,
        "created_at": "2021-01-13T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": false,
        "is_archived": true,
        "admin_id": 1
    },
    ...
]
```

#### Get all rooms for a particular topic

```http
  GET /:topic_id/rooms
```

Query parameters:
| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `topic_id`| `integer` | **Required**. Id of topic to get rooms for |

Response:

```bash
[
    {
        "id": 1,
        "name": "the danger zone",
        "topic_id": 1,
        "created_at": "2021-01-13T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": false,
        "is_archived": true,
        "admin_id": 1
    }
]
```

#### Get all messages for a particular room

```http
  GET /rooms/:room_id/messages
```

Query parameters:
| Parameter | Type      | Description                                  |
| :-------- | :-------- | :------------------------------------------- |
| `room_id` | `integer` | **Required**. Id of room to get messages for |

Response:

```bash
[
    {
        "id": 1,
        "room_id": 1,
        "user_id": 1,
        "body": "testing",
        "created_at": "2021-02-13T12:05:06.000Z"
    },
    {
        "id": 3,
        "room_id": 1,
        "user_id": 3,
        "body": "hello world",
        "created_at": "2021-02-15T12:05:06.000Z"
    },
    ...
]
```

#### Get all users for a particular room

```http
  GET /rooms/:room_id/users
```

Query parameters:
| Parameter | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `room_id` | `integer` | **Required**. Id of room to get users for |

Response:

```bash
[
    {
      "id": 1,
      "first_name": "user1",
      "last_name": "last name",
      "email": "email1@email.email",
      "avatar": "https://via.placeholder.com/50x50",
      "created_at": "2021-01-13T12:05:06.000Z"
    },
    {
      "id": 3,
      "first_name": "user3",
      "last_name": "last name",
      "email": "email3@email.email",
      "avatar": "https://via.placeholder.com/50x50",
      "created_at": "2021-01-13T12:05:06.000Z"
    },
    ...
]
```

#### Post a message to a particular room

```http
  POST /rooms/:room_id/messages
```

Query parameters:
| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `room_id` | `integer` | **Required**. Id of room |

Request body:
| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `user_id` | `integer` | **Required**. Id of user posting |
| `body`    | `string`  | **Required**. Content of message |


#### Create a user
```http
  POST /users/create
```

Request body:
| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `first_name`| `string` | **Required**. first name of user            |
| `last_name`| `string` | **Required**. last name of user            |
| `email`| `string` | **Required**. email of user            |
| `avatar`  | `string` | **Required**. url of user's profile photo |


#### Create a room in a particular topic

```http
  POST /rooms/:topic_id/create
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of room |
| `thumbnail`      | `string` | **Required**. URL of thumbnail image |
| `max_users`      | `integer` | **Required**. Max number of users wanted |
| `is_private`      | `boolean` | **Required**. Mark room as private |
| `admin_id`      | `integer` | **Required**. Id of user making the room |

#### Add a user to a particular room

```http
  POST /addUserToRoom
```

Request body:
| Parameter | Type      | Description                       |
| :-------- | :-------- | :-------------------------------- |
| `user_id` | `integer` | **Required**. Id of user to add |
| `room_id` | `integer` | **Required**. Id of room to add user into |

#### Create an event for a particular room

```http
  POST /rooms/create_event
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the event |
| `description`      | `string` | **Required**. Description of the event |
| `user_id`      | `integer` | **Required**. Id of user who created the event |
| `room_id`      | `integer` | **Required**. Id of the room where the event was created |
| `event_date`      | `datetime` | **Required**. Date and time of the event |

#### Create a goal for a particular room

```http
  POST /rooms/:room_id/goal
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id`      | `integer` | **Required**. Id of room the goal belongs to |

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the goal |
| `description`      | `string` | **Required**. Description of the goal |
| `goal_date`      | `datetime` | Date of the goal |
| `user_id`      | `integer` | **Required**. Id of user who created the goal |

#### Toggle a room as archived

```http
  PUT /toggle-archive
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to archive/reactivate |


#### Get events for a given room

```http
  GET /rooms/:room_id/events
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to retrieve events from |

```bash
[
    {
        "id": 1,
        "name": "study session",
        "description": "we're gonna study",
        "user_id": 1,
        "room_id": 1,
        "created_at": "2021-03-13T12:05:06.000Z",
        "event_date": "2021-03-14T11:05:06.000Z"
    },
    {
        "id": 2,
        "name": "study session",
        "description": "we're gonna study",
        "user_id": 1,
        "room_id": 1,
        "created_at": "2021-03-14T11:05:06.000Z",
        "event_date": "2021-03-15T11:05:06.000Z"
    },
    ...
]
```

#### Get goals for a given room

```http
  GET /rooms/:room_id/goals
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to retrive goals from |

```bash
[
    {
        "id": 1,
        "name": "goal1",
        "description": "description1",
        "created_at": "2021-04-13T11:05:06.000Z",
        "goal_date": "2021-04-15T11:05:06.000Z",
        "user_id": 1,
        "room_id": 1,
        "user_ids": [
            1
        ]
    },
    {
        "id": 2,
        "name": "goal2",
        "description": "description2",
        "created_at": "2021-04-14T11:05:06.000Z",
        "goal_date": "2021-04-16T11:05:06.000Z",
        "user_id": 1,
        "room_id": 1,
        "user_ids": [
            1
        ]
    },
    ...
]
```

#### Add a user to a given goal

```http
  POST /goals/add-user
```
Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `integer` | **Required**. Id of the user to add to a goal |
| `goal_id` | `integer` | **Required**. Id of goal receiving a user |

#### Get all files for a given room

```http
  GET /rooms/:room_id/files
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to retrieve file URLs from |

```bash
[
    {
        "id": 1,
        "url": "https://via.placeholder.com/50x50",
        "name": "placeholder10",
        "room_id": 1,
        "user_id": 1,
        "created_at": "2021-12-11T00:14:49.264Z"
    },
    {
        "id": 5,
        "url": "https://via.placeholder.com/50x50",
        "name": "placeholder5",
        "room_id": 1,
        "user_id": 2,
        "created_at": "2021-12-11T00:14:49.264Z"
    },
    ...
]
```

#### Add a file to a given room

```http
  POST /rooms/:room_id/files
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to add file into |

Request Body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url` | `string` | **Required**. Url of the file from file hosting storage |
| `name` | `string` | **Required**. Name of the file |
| `user_id` | `string` | **Required**. Id of the user who is posting the file |

#### Removes a file from a given room

```http
  POST /files/:file_id/delete
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file_id` | `integer` | **Required**. Id of the file to delete |

#### Get all rooms for a given user

```http
  GET /user/:user_id/rooms
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `integer` | **Required**. Id of the user to retrieve rooms for |

```bash
[
    {
        "id": 1,
        "name": "the danger zone",
        "topic_id": 1,
        "created_at": "2021-01-13T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": false,
        "is_archived": true,
        "admin_id": 1
    },
    {
        "id": 2,
        "name": "Tim's Room",
        "topic_id": 3,
        "created_at": "2021-01-14T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": true,
        "is_archived": false,
        "admin_id": 1
    },
    ...
]
```