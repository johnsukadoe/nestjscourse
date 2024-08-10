import { Injectable, NotFoundException } from '@nestjs/common'
import type { CreateMovieDto } from './dto/create-movie.dto'
import type { UpdateMovieDto } from './dto/update-movie.dto'
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
	private movies:Movie[] = [];
	
	getAll():Movie[]{
		return this.movies;
	}
	
	getOne(id:number):Movie{
		const movie =  this.movies.find(movie =>movie.id === id)
		if(!movie){
			throw new NotFoundException(`Film with ${id} not found`)
		}
		return movie
	}
	
	remove(id:number){
		this.getOne(id)
		this.movies = this.movies.filter(movie =>movie.id !== id)
	}
	
	create(data:CreateMovieDto){
		this.movies.push({id:this.movies.length + 1, ...data})
	}
	
	update(id:number, data:UpdateMovieDto){
		const movie = this.getOne(id);
		this.remove(id);
		this.movies.push({...movie, ...data})
	}
}
