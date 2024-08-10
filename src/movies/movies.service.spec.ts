import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('getAll', ()=>{
    it('should returns array', ()=>{
      const result= service.getAll();
      expect(result).toBeInstanceOf(Array)
    })
  })
  
  describe('getOne', ()=>{
    it('should return object', ()=>{
      service.create({
        title:'Something',
        year:2000,
        genres:['something']
      });
      const result = service.getOne(1)
      expect(result).toBeDefined()
      expect(result.id).toEqual(1)
    })
    
    it('should return 404 error', ()=>{
      try{
        const movie = service.getOne(37923424)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Film with 37923424 not found`)
      }
    })
    
  })
});
