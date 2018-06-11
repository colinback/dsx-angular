import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryApiService implements InMemoryDbService {

  createDb() {
    const projects = [
      {
        id: 10,
        name: 'szy1',
        type: 'Normal',
        role: 'Admin',
        description: 'project szy1',
        lastUpdated: 1521170361180,
      },
      {
        id: 11,
        name: 'szy2',
        type: 'Normal',
        role: 'Viewer',
        description: 'project szy2',
        lastUpdated: 1521170361180
      },
      {
        id: 12,
        name: 'szy3',
        type: 'Library',
        role: 'Editor',
        description: 'project szy3',
        lastUpdated: 1521170361180
      },
      {
        id: 13,
        name: 'szy4',
        type: 'Normal',
        lastUpdated: 1521170361180
      },
      {
        id: 14,
        name: 'szy5',
        type: 'Library',
        role: 'Admin',
        lastUpdated: 1521170361180
      },
      {
        id: 15,
        name: 'szy6',
        type: 'Normal',
        role: 'Admin',
        lastUpdated: 1521170361180
      }
    ];

    const accounts = [
      {
        id : 1,
        login : 'admin',
        firstName : 'Administrator',
        lastName : 'Administrator',
        email : 'admin@localhost',
        imageUrl : '',
        activated : true,
        langKey : 'en',
        createdBy : 'system',
        createdDate : 1521170361180,
        lastModifiedBy : 'system',
        lastModifiedDate : null,
        authorities : [ 'ROLE_USER', 'ROLE_ADMIN' ]
      }, {
        id : 2,
        login : 'user',
        firstName : 'User',
        lastName : 'User',
        email : 'user@localhost',
        imageUrl : '',
        activated : true,
        langKey : 'en',
        createdBy : 'system',
        createdDate : 1521170361180,
        lastModifiedBy : 'system',
        lastModifiedDate : null,
        authorities : [ 'ROLE_USER' ]
      }
    ];

    return { accounts, projects };
  }
}
