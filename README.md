
# Study IO API

A RESTful API for Study IO, a learning application.

## Installation

Install the Study IO API dependencies with npm

```bash
  cd api
  npm install
```
Due to security concerns, the Postgres connection string is stored in a config.js file that is not provided. Please make a config.js file using the config.example.js file provided.

To start

```bash
  npm start
```

Study IO requires Postgres. To locally load mock data:

```bash
  Change the filepaths in schema.sql to where your locally stored .csv files are
  In your terminal, run psql -h localhost -f schema.sql
```

## Documentation

[Quick Start Guide For PostgreSQL](https://chartio.com/resources/tutorials/how-to-start-postgresql-server-on-mac-os-x/)<br />
[Mock Data](https://docs.google.com/spreadsheets/d/1pP8pmFDK-arZ6Yv5m1dNQe5gDxmmd9VweVFYvMPET-I/edit?usp=sharing)

## API Reference

### TOPICS
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

### ROOMS
#### Get all rooms

```http
  GET /rooms
```

Response:

```bash
[
    {
        "id": "hJ_Q0GG000",
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

#### Get details for a room

```http
  GET /room/:room_id
```

Query parameters:
| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `room_id`| `string` | **Required**. Id of room to get details for |

Response:

```bash
{
    "id": "hJ_Q0GG000",
    "name": "the danger zone",
    "topic_id": 1,
    "created_at": "2021-01-13T12:05:06.000Z",
    "thumbnail": "https://via.placeholder.com/200x200",
    "max_users": 20,
    "is_private": false,
    "is_archived": true,
    "admin_id": 1,
    "invite_key": null,
    "user_ids": [
        1,
        101,
        201,
        50
    ]
}
```

#### Get all rooms for a particular topic

```http
  GET /topic/:topic_id/rooms
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
    },
    ...
]
```

#### Search for rooms

```http
  POST /rooms/search
```

Request body:
| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `search_value`| `string` | **Required**. Text to search for rooms (case sensitive)|

Response:

```bash
[
    {
        "id": 10,
        "name": "the room",
        "topic_id": 7,
        "created_at": "2021-01-22T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": true,
        "is_archived": false,
        "admin_id": 10
    },
    {
        "id": 11,
        "name": "room1",
        "topic_id": 1,
        "created_at": "2021-01-23T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": false,
        "is_archived": false,
        "admin_id": 1
    },
    ...
]
```

#### Create a room in a particular topic

```http
  POST /:topic_id/rooms/create
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. **Unique**. Name of room |
| `thumbnail`      | `string` | **Required**. URL of thumbnail image |
| `max_users`      | `integer` | **Required**. Max number of users wanted |
| `is_private`      | `boolean` | **Required**. Mark room as private |
| `admin_id`      | `integer` | **Required**. Id of user making the room |

Response:

```bash
{
    "room_id": "IYdnM6YiWJ"
}
```

#### Add a user to a particular room

```http
  POST /addUserToRoom
```

Request body:
| Parameter | Type      | Description                       |
| :-------- | :-------- | :-------------------------------- |
| `user_id` | `integer` | **Required**. Id of user to add |
| `room_id` | `string` | **Required**. Id of room to add user into |

#### Toggle a room as archived

```http
  PUT /toggle-archive
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `string` | **Required**. Id of the room to archive/reactivate |

#### Adds or updates invite key for room

```http
  PUT /rooms/new-invite-key
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `string` | **Required**. Id of the room to generate an invite key for |
| `invite_key` | `string` | **Required**. Invite key to room |

#### Verify if invite key is for a particular room

```http
  POST /rooms/new-invite-key
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `string` | **Required**. Id of the room to generate an invite key for |
| `invite_key` | `string` | **Required**. Invite key to room |

Responses:
```true``` if invite key matches
```false``` if not

### MESSAGES
#### Get all messages for a particular room

```http
  GET /rooms/:room_id/messages
```

Query parameters:
| Parameter | Type      | Description                                  |
| :-------- | :-------- | :------------------------------------------- |
| `room_id` | `string` | **Required**. Id of room to get messages for |

Response:

```bash
[
    {
        "id": 1,
        "room_id": "hJ_Q0GG000",
        "user_id": 1,
        "body": "testing",
        "created_at": "2021-12-14T20:02:41.634Z",
        "first_name": "user1",
        "last_name": "last name"
    },
    {
        "id": 101,
        "room_id": "hJ_Q0GG000",
        "user_id": 101,
        "body": "what?",
        "created_at": "2021-12-14T20:02:41.634Z",
        "first_name": "user101",
        "last_name": "last name"
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
| `room_id` | `string` | **Required**. Id of room |

Request body:
| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `user_id` | `integer` | **Required**. Id of user posting |
| `body`    | `string`  | **Required**. Content of message |

### USERS
#### Get all users for a particular room

```http
  GET /rooms/:room_id/users
```

Query parameters:
| Parameter | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `room_id` | `string` | **Required**. Id of room to get users for |

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

#### Get all rooms for a particular user

```http
  GET /user/:user_id/rooms
```

Query parameters:
| Parameter | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `user_id` | `id` | **Required**. Id of user to get rooms for |

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
| `avatar`  | `string` | url of user's profile photo |
| `password`  | `string` | user's password |
| `googleId`  | `string` | user's googleId |

Note: needs a password OR googleId to create a user

### GOALS
#### Get all goals for a given room

```http
  GET /rooms/:room_id/goals
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `string` | **Required**. Id of the room to retrive goals from |

```bash
[
    {
        "id": 1,
        "name": "goal1",
        "created_at": "2021-04-13T04:05:06.000Z",
        "user_id": 1,
        "room_id": "hJ_Q0GG000",
        "user_ids": [
            1,
            199
        ]
    },
    {
        "id": 101,
        "name": "goal101",
        "created_at": "2021-07-22T04:05:06.000Z",
        "user_id": 101,
        "room_id": "hJ_Q0GG000",
        "user_ids": [
            101
        ]
    },
    ...
]
```

#### Get all users for a particular goal

```http
  GET /goals/:goal_id
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `goal_id` | `integer` | **Required**. Id of the goal to retrieve users from |

```bash
[
    {
        "id": 1,
        "user_id": 1,
        "goal_id": 1,
        "created_at": "2021-12-11T18:53:40.272Z"
    },
    {
        "id": 199,
        "user_id": 199,
        "goal_id": 1,
        "created_at": "2021-12-11T18:53:40.272Z"
    },
    ...
]
```

#### Create a goal for a particular room

```http
  POST /rooms/:room_id/goals
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id`      | `string` | **Required**. Id of room the goal belongs to |

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the goal |
| `user_id`      | `integer` | **Required**. Id of user who created the goal |
| `goal_date`      | `date` | End date to reach goal (optional) |


#### Update a goal

```http
  PUT /goals/:goal_id
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `goal_id`      | `string` | **Required**. Id of the goal |

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the goal |
| `goal_date`      | `date` | **Required**. Date of the goal |

#### Delete a goal

```http
  DELETE /goals/:goal_id
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `goal_id` | `integer` | **Required**. Id of the goal to delete |

#### Add a user to a given goal

```http
  POST /goals/add-user
```
Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `integer` | **Required**. Id of the user to add to a goal |
| `goal_id` | `integer` | **Required**. Id of goal receiving a user |

### EVENTS
#### Get all events for a given room

```http
  GET /rooms/:room_id/events
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `string` | **Required**. Id of the room to retrieve events from |

```bash
[
    {
        "id": 1,
        "name": "study session",
        "user_id": 1,
        "room_id": "hJ_Q0GG000",
        "created_at": "2021-03-13T04:05:06.000Z",
        "event_date": "2021-03-14T00:00:00.000Z",
        "event_time": "11:00:00"
    },
    ...
]
```

#### Create an event for a particular room

```http
  POST /rooms/create_event
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the event |
| `user_id`      | `integer` | **Required**. Id of user who created the event |
| `room_id`      | `string` | **Required**. Id of the room where the event was created |
| `event_date`      | `date` | **Required**. Date of the event |
| `event_time`      | `time` | **Required**. Time of the event |


#### Update an event

```http
  PUT /events/:event_id
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `event_id` | `integer` | **Required**. Id of the event |

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the event |
| `event_date`      | `date` | **Required**. Date of the event |
| `event_time`      | `time` | **Required**. Time of the event |

#### Delete an event

```http
  DELETE /events/:event_id
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `event_id` | `integer` | **Required**. Id of the event to delete |

### FILES
#### Get all files for a given room

```http
  GET /rooms/:room_id/files
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `string` | **Required**. Id of the room to retrieve file URLs from |

```bash
[
    {
        "id": 1,
        "url": "https://via.placeholder.com/50x50",
        "name": "placeholder1",
        "room_id": "hJ_Q0GG000",
        "user_id": 1,
        "created_at": "2021-12-14T20:02:41.665Z"
    }
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
| `room_id` | `string` | **Required**. Id of the room to add file into |

Request Body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url` | `string` | **Required**. Url of the file from file hosting storage |
| `name` | `string` | **Required**. Name of the file |
| `user_id` | `string` | **Required**. Id of the user who is posting the file |

#### Remove a file from a given room

```http
  DELETE /files/:file_id/delete
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file_id` | `integer` | **Required**. Id of the file to delete |

### Authentication
#### Verify if user exists and user-provided authentication is correct

```http
  POST /users/auth
```

Request Body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Email of the user |
| `password` | `string` | Password for the user  |
| `googleId` | `string` | Google ID provided by google authentication |

Note:
Password OR Google ID can be provided

Response:
On successful authenthication:
```bash
{
    "id": 307,
    "first_name": "bobby",
    "last_name": "hill",
    "email": "anotherEmail@email.com",
    "avatar": "https://via.placeholder.com/50x50",
    "created_at": "2021-12-13T20:04:55.146Z"
}
```
On unsuccessful authentication:
```bash
false
```