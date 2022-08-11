import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Create User', () => {
  let service: UsersService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  const expectedUser : CreateUserDto = {
    email: 'validemail@provider.com',
    password: 'someStrongPassword',
    username: 'Avg. Joe'
  }
  try{
    service.create(expectedUser).then(console.info)
  }
  catch(error:any){
    // user probably already exists
  }

  // It should save the user and be capable of fetch by email
  // the password stored must be different from the one gave
  service.findByEmail(expectedUser.email).then((givenUser) => {
    it('should save the user', () =>{
      expect(givenUser.username).toBe(expectedUser.username);
      expect(givenUser.email).toBe(expectedUser.email);
      expect(givenUser.password).not.toEqual(expectedUser.password);
    });
  });

})