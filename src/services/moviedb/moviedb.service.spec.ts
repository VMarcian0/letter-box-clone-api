import { Test, TestingModule } from '@nestjs/testing';
import { MovieDBService } from './moviedb.service';

describe('MoviedbService', () => {
  let service: MovieDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieDBService],
    }).compile();

    service = module.get<MovieDBService>(MovieDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
