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
  
  describe('remove', ()=>{
    it('should remove film', ()=>{
      service.create({
        title:'Something',
        year:2000,
        genres:['something']
      });
      const allMovies = service.getAll().length
      service.remove(1);
      const afterRemove = service.getAll().length
      expect(afterRemove).toBeLessThan(allMovies)
    })
    
    it('should return 404', ()=>{
      try{
        const movie = service.remove(37923424)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Film with 37923424 not found`)
      }
    })
  })
  
  
  describe('create',()=>{
    it('should create film', ()=>{
      const allMovie = service.getAll().length
      service.create({
        title:'Something',
        year:2000,
        genres:['something']
      });
      
      const afterMovie = service.getAll().length;
      
      expect(afterMovie).toBeGreaterThan(allMovie)
    })
  })
  
  describe('update', ()=>{
    it('should update film', ()=>{
      service.create({
        title:'Something',
        year:2000,
        genres:['something']
      });
      
      service.update(1, {title:'Miras'})
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Miras')
    })
    
    it('should return 404', ()=>{
      try{
        const movie = service.update(37923424, {})
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Film with 37923424 not found`)
      }
    })
  })
});
